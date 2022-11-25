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

const checkIsUserValid = function (req, res, next) {
   /**
    * @param { token } auth user token, user is valid or not.
    * @return { Response } if the user is not valid then send back the invalid response to the client.
    */
   const { token } = req.params;

   if (!token) {
      return res.status(200).json({
         success: false,
         message: 'invalid token',
      });
   } else {
      next();
   }
};

module.exports = {
   catchAsync,
   httpStatusCodes,
   checkIsUserValid,
};
