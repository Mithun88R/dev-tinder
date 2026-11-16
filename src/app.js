const express = require("express");

const app = express();

// this will only handle get call to /user if /user?userId=100 then use req.query and get { userId: '100' }
app.get(
  "/user",
  (req, res, next) => {
    console.log(req.query);
    //res.send("response 1");
    next();
  },
  (req, res) => {
    res.send("response 2");
  },
);

app.listen(5555, () => {
  console.log("Server is running successfully in port 5555");
});
