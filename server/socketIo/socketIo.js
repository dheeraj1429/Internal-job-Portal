const groupModel = require("../model/schema/groupSchema");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const socketIoConnection = function (io) {
   // socket connection
   io.on("connection", (socket) => {
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
                  socket.join(spaceRemove);

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
         const replaceSpace = data.groupName.trim().replaceAll(" ", "-");
         socket.join(replaceSpace);
         console.log(replaceSpace);
      });

      socket.on("_group_data", (args) => {
         console.log(args);
      });

      socket.on("_remove_group_users", async (args) => {
         const { token, groupName, groupId, userId } = args;
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
               // send response to the group users
               socket.to(groupName.trim().replaceAll(" ", "-")).emit("_user_remove_response", {
                  success: true,
                  message: `${varifyToken.name} removed you from ${groupName.replaceAll(
                     "-",
                     " "
                  )} group.`,
                  groupId,
                  userId,
               });

               // send back the response to the admin.
               socket.emit("_user_remove_response", {
                  success: true,
                  message: `user is removed from ${groupName.replaceAll("-", " ")}`,
                  groupId,
                  userId,
                  _id,
               });
            }
         } else {
            socket.emit("_user_remove_response", { success: false, message: "Invalid token" });
         }
      });

      socket.on("disconnect", (reason) => {
         // handle offline status
         console.log("User is disconnect the room");
         console.log(reason);
      });
   });
};

module.exports = socketIoConnection;
