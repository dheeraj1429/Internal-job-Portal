export const checkPassword = function (pwd) {
   var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
   if (pwd.match(paswd)) return true;
   else return false;
};
