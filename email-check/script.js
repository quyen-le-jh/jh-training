function isValidEmail(email) {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

let email1 = "abc@gmail.com";
let email2 = "test_email.com";

console.log(isValidEmail(email1));
console.log(isValidEmail(email2));
