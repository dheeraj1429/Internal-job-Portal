const mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB;
const databaseConnection = function (callback) {
   mongoose
      .connect(mongodbURI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then((res) => {
         callback();
         console.log('database connected');
      })
      .catch((err) => console.log(err));
};

module.exports = databaseConnection;
