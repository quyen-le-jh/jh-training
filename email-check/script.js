function isValidEmail(email) {
  let emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return emailRegex.test(email);
}

let email1 = "abc@gmail.com";
let email2 = "quyen.@journeyh.io";

console.log(isValidEmail(email1));
console.log(isValidEmail(email2));
