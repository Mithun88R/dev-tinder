const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Mandatory Fields Required");
  } else if (firstName.length < 4) {
    throw new Error("First Name Length should be greater than 4");
  } else if (firstName.length > 50) {
    throw new Error("First Name Length should not be greater than 50");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a Valid EmailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Strong " + password);
  }
};

module.exports = { validateSignUpData };
