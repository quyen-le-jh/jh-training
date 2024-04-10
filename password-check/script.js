// function isValidPassword(password) {
//   if (
//     password.length < 8 ||
//     !/[A-Z]/.test(password) ||
//     !/\d/.test(password) ||
//     !/[^A-Za-z0-9]/.test(password)
//   ) {
//     return false;
//   }

//   return true;
// }

function isValidPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

let password = "Pquyen02@";

if (isValidPassword(password)) {
  console.log("Password is valid");
} else {
  console.log("Password is not valid");
}
