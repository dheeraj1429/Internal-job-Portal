const authModel = require('../model/schema/authSchema');
const { catchAsync, httpStatusCodes } = require('../helpers/helper');
const bcryptjs = require('bcryptjs');

const userSignIn = catchAsync(async function (req, res, next) {
   const { name, email, password } = req.body;

   // find the email is exits in database or not.
   const findUserEmail = await authModel.findOne({ email });
   if (findUserEmail) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'email is already used',
      });
   } else {
      const newUserSignIn = await authModel({
         name,
         email,
         password,
      });

      const saveUser = await newUserSignIn.save();
      const token = await saveUser.genrateUserToken();

      const userObject = {
         name,
         email,
         token,
      };

      res.cookie('user', userObject);

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'User account created',
         userObject,
      });
   }
});

const userLogin = catchAsync(async function (req, res, next) {
   const { email, password } = req.query;
   // check the email is match
   const findUserAccount = await authModel.findOne({ email });
   if (!findUserAccount) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'No account find',
      });
   }

   // varify the user password is match or not.
   const varifyPassword = await bcryptjs.compare(password, findUserAccount.password);

   if (!varifyPassword) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'Account password is not match',
      });
   }

   // genrate the user new token.
   const token = await findUserAccount.genrateUserToken();

   const userObject = {
      name: findUserAccount.name,
      email: findUserAccount.email,
      token,
   };

   // set the user into the browser cookie
   res.cookie('user', userObject);

   return res.status(httpStatusCodes.OK).json({
      success: true,
      userObject,
   });
});

module.exports = {
   userSignIn,
   userLogin,
};
