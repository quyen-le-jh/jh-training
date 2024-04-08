function isValidPassword(password) {
  if (password.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return false;
  }

  return true;
}

let password = "Pquyen02@";

if (isValidPassword(password)) {
  console.log("Password is valid");
} else {
  console.log("Password is not valid");
}
