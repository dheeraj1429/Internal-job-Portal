const jwt = require("jsonwebtoken");
const multer = require("multer");
const SECRET_KEY = process.env.SECRET_KEY;
const { v4: uuidv4 } = require("uuid");

const catchAsync = (fn) => {
   /**
    * @fn function which is wrapperd by the catchAsync function to use the DRY method.
    * passdown the request, response and the next argumens into the innerfunction.
    */

   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         console.log(err);
      });
   };
};

const httpStatusCodes = {
   OK: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NO_CONTENT: 204,
   PARTIAL_CONTENT: 206,
   NOT_MODIFIED: 304,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   INTERNAL_SERVER: 500,
};

const fetchPaginationData = async function (
   collection,
   page,
   documentLimit,
   res,
   filed,
   ...queryObject
) {
   /**
    * @collection where we want to fetch the data.
    * @page which page data we want to access. like page 1, page 2, .... etc.
    * @documentLimit how much documents we want to send back...
    * @param { Object } res.
    * @filed response data filed name.
    * @totalDocuments count how much document we have
    * @document fetch the data from the database with limit and
    * @return { Object }
    */

   const totalDocuments = (await collection.countDocuments({})) - 1;

   const document = await collection.find(...queryObject);

   const cursorDocument = await collection
      .find(...queryObject)
      .skip(page * documentLimit)
      .limit(documentLimit);

   if (cursorDocument) {
      const cursorDocument = await collection
         .find(...queryObject)
         .limit(documentLimit)
         .skip(page * documentLimit);

      if (document) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            totalPages: Math.ceil(totalDocuments / documentLimit - 1),
            totalDocuments,
            [filed]: cursorDocument,
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            totalPages: Math.ceil(totalDocuments / documentLimit - 1),
            totalDocuments,
            [filed]: cursorDocument,
         });
      }
   }
};

const checkIsUserValid = function (req, res, next) {
   /**
    * @param { token } auth user token, user is valid or not.
    * @return { Response } if the user is not valid then send back the invalid response to the client.
    */
   const { token } = req.params;
   const varifyToken = jwt.verify(token, SECRET_KEY);

   if (!varifyToken) {
      return res.status(200).json({
         success: false,
         message: "invalid token",
      });
   } else {
      next();
   }
};

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      if (
         file.mimetype === "image/png" ||
         file.mimetype === "image/jpeg" ||
         file.mimetype === "image/jpg"
      ) {
         if (file.fieldname === "attachImageFile") {
            callback(null, "./upload/attacthFiles/images");
         } else {
            callback(null, "./upload/usersProfile");
         }
      }

      if (file.mimetype === "application/pdf") {
         callback(null, `./upload/userResume`);
      }
   },
   filename: function (req, file, callback) {
      const uniqueId = uuidv4();
      const fileUniqueName = `${uniqueId}${file.originalname}`;
      req.fileUniqueName = fileUniqueName;
      callback(null, fileUniqueName);
   },
});

const upload = multer({ storage: storage }).any();

module.exports = {
   catchAsync,
   httpStatusCodes,
   checkIsUserValid,
   fetchPaginationData,
   upload,
};
