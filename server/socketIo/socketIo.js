const groupModel = require("../model/schema/groupSchema");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { v4: uuidv4 } = require("uuid");
const authModel = require("../model/schema/authSchema");

let roomId;

const socketIoConnection = function (io) {
   // socket connection
   io.on("connection", (socket) => {
      // capture user is online or offline
      socket.on("_live", (args) => {
         // event single user to see the online status
         socket.broadcast.emit("_online", { ...args, online: true });
         // send back the user also see his own online status
         socket.emit("_online", { ...args, online: true });
      });

      // listing socket connection...
      console.log("socket connected", socket.id);

      // create a user group
      socket.on("_create_group", async (args) => {
         const { groupName, employees, groupAdmin } = args;
         const spaceRemove = groupName.trim().replaceAll(" ", "-");

         if (!!groupName) {
            // check is group already exists or not.
            const checkGroupIsExists = await groupModel.findOne({ groupName: spaceRemove });

            if (checkGroupIsExists) {
               socket.emit("_group_created", {
                  success: false,
                  message: "Group is already exists",
               });
            } else {
               const employeesAr = [];
               const groupEmployeesIds = [];

               if (!!employees.length) {
                  for (let i = 0; i < employees.length; i++) {
                     employeesAr.push({
                        userId: employees[i]._id,
                     });
                  }
               }

               if (!!employees.length) {
                  for (let i = 0; i < employees.length; i++) {
                     groupEmployeesIds.push(employees[i]._id);
                  }
               }

               // insert new group into the database.
               const createGroup = await groupModel({
                  groupName: spaceRemove,
                  groupUsers: employeesAr,
               }).save();

               if (createGroup) {
                  // send the broad cast toe every online users. and then check if the user is is match so user can join the room.
                  socket.broadcast.emit("_group_created_broadCast", {
                     groupAdmin,
                     groupEmployeesIds,
                     success: true,
                     groupInfo: [
                        {
                           groupData: {
                              groupName,
                              _id: createGroup._id,
                           },
                        },
                     ],
                  });

                  // join the admin in the group
                  socket.join(createGroup._id);
                  roomId = createGroup._id;

                  socket.emit("_group_created", {
                     success: true,
                     message: "Group created",
                     groupInfo: [
                        {
                           groupData: {
                              groupName: spaceRemove,
                              _id: createGroup._id,
                           },
                        },
                     ],
                  });
               }
            }
         } else {
            // when the request if false.
            socket.emit("_group_created", {
               success: false,
               message: "Group name is required!",
            });
         }
      });

      // joining the room.
      socket.on("_join_group", (data) => {
         socket.join(data.groupId);
         roomId = data.groupId;
      });

      /**
       * check the user is exits in group chat database.
       * if user is exits the user able to join the room.
       */
      socket.on("_user_is_exist_in_group", async (args) => {
         const { token, groupId, role } = args;
         roomId = groupId;

         // varify user token.
         const varifyToken = await jwt.verify(token, SECRET_KEY);
         const { _id } = varifyToken;

         if (role === "employee") {
            const userIsExistsInGroup = await groupModel.findOne(
               { _id: groupId, groupUsers: { $elemMatch: { userId: _id } } },
               { "groupUsers.$": 1 }
            );

            if (!!userIsExistsInGroup && userIsExistsInGroup?.groupUsers.length) {
               socket.join(groupId);
               socket.emit("_user_group_response", { success: true, type: "_user_exists", message: "You in a group chat" });
            } else {
               // if user is not exits in database group chat collection then user no loger to send messages in group chat
               socket.emit("_user_group_response", { success: true, type: "_user_removed", message: "You are removed from the group chat" });
            }
         }

         if (role === "subAdmin") {
            // always able to join the room and send messages
            socket.emit("_user_group_response", { success: true, type: "_user_exists", message: "You in a group chat" });
            socket.join(groupId);
         }
      });

      // leave group chat room
      socket.on("_leave_room", (args) => {
         socket.leave(args.groupId);
         console.log(`${socket.id} user leave from ${args.groupId} group`);
      });

      // remove user from groups
      socket.on("_remove_group_users", async (args) => {
         const { token, groupName, groupId, userId, profilePic } = args;
         const varifyToken = await jwt.verify(token, SECRET_KEY);

         if (varifyToken) {
            /**
             * if token is valid then share the data with admin and also group user
             * to keep track which user is removed.
             * if token is not valid then only send back response with admin.
             * @findAndRemoveUserFromGroup find and remove users from group model.
             * keep checking user is removed or not.
             * if the user is removed from the admin dashboard group then also remove user from the user dashboard.
             */

            const { _id } = varifyToken;

            const findAndRemoveUserFromGroup = await groupModel.updateOne(
               {
                  _id: groupId,
               },
               { $pull: { groupUsers: { userId } } }
            );

            if (!!findAndRemoveUserFromGroup?.modifiedCount) {
               const findRemovedUser = await authModel.findOne({ _id: userId });
               const _sender_message_id = uuidv4();

               // store the removed information inside the database.
               const removeUserFromGroup = await groupModel.updateOne(
                  { _id: groupId },
                  { $push: { groupMessages: { userId: _id, message: `${findRemovedUser.name} removed from ${groupName} group`, userRemoved: true } } }
               );

               if (!!removeUserFromGroup.modifiedCount) {
                  // send response to the group users
                  io.in(groupId).emit("_user_remove_response", {
                     success: true,
                     message: `${varifyToken.name} removed you from ${groupName.replaceAll("-", " ")} group.`,
                     groupId,
                     userId,
                     _sender_message_id,
                     userRemoved: true,
                     userInfo: {
                        name: varifyToken?.name,
                        profilePic,
                        _id,
                     },
                  });

                  // send back the response to the admin.
                  // just because admin is not join in the room that's why we are using emit function to send back the respose to the admin also.
                  socket.emit("_user_remove_response", {
                     success: true,
                     message: `user is removed from ${groupName.replaceAll("-", " ")}`,
                     groupId,
                     userId,
                     _id,
                  });
               }
            }
         } else {
            socket.emit("_user_remove_response", { success: false, message: "Invalid token" });
         }
      });

      socket.on("_send_group_message", async (args) => {
         /**
          * grab all the details to find which user is send the message, and the group id.
          * find the group and insert all the messages the collections.
          * always genrate the unique id for the sender and the recever massage. to check message only send
          * on time.
          * when evern the message is send then always send back the data and time.
          */
         const { groupId, userInfo, message } = args;
         const _sender_message_id = uuidv4();

         // store data inside the database.
         await groupModel.updateOne({ _id: groupId }, { $push: { groupMessages: { userId: userInfo._id, message } } });

         // send back the massage to the all group users.
         io.in(groupId).emit("_receive_message", {
            groupId,
            userInfo,
            message,
            _sender_message_id,
         });
      });

      socket.on("disconnect", (reason) => {
         // handle offline status
         console.log("User is disconnect ", socket.id);
         console.log(reason);
         socket.leave(roomId);
         console.log(`${socket.id} user leave from ${roomId} group`);
      });
   });
};

module.exports = socketIoConnection;
