export const checkPassword = function (pwd) {
   var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
   if (pwd.match(paswd)) return true;
   else return false;
};

export const ENDPOINT = "http://127.0.0.1:8000";
