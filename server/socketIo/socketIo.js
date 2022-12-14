const groupModel = require("../model/schema/groupSchema");

const socketIoConnection = function (io) {
   // socket connection
   io.on("connection", (socket) => {
      // listing socket connection...
      console.log("socket connected", socket.id);

      // create a user group
      socket.on("_create_group", async (args) => {
         const { groupName, employees, groupAdmin } = args;

         if (!!groupName) {
            // check is group already exists or not.
            const checkGroupIsExists = await groupModel.findOne({ groupName });

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
                  groupName,
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
                  socket.join(groupName);

                  socket.emit("_group_created", {
                     success: true,
                     message: "Group created",
                     groupInfo: [
                        {
                           groupData: {
                              groupName,
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
         socket.join(data.groupName);
         console.log(data);
      });

      socket.on("_group_data", (args) => {
         console.log(args);
      });

      io.on("disconnect", (reason) => {
         console.log("User is disconnect the room");
         console.log(reason);
      });
   });
};

module.exports = socketIoConnection;
