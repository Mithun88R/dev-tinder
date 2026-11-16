const authAdmin = (req, res, next) => {
  console.log("Authentication is checked for Admin");
  const token = "asdf";
  const authToken = token === "asdf";
  if (!authToken) {
    res.status(401).send("UnAuthorized User");
  } else {
    next();
  }
};

const authUser = (req, res, next) => {
  console.log("Authentication is checked for User");
  const token = "asdf";
  const authToken = token === "asdf";
  if (!authToken) {
    res.status(401).send("UnAuthorized User");
  } else {
    next();
  }
};

module.exports = { authAdmin, authUser };
