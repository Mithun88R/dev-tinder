const express = require("express");

const app = express();
const { authAdmin, authUser } = require("./middleware/auth");

app.use("/admin", authAdmin);

app.get("/admin/alldatas", (req, res) => {
  res.send("get all data");
});

// this will only handle get call to /user if /user?userId=100 then use req.query and get { userId: '100' }
app.get("/user", authUser, (req, res) => {
  res.send("get user data");
});

app.listen(5555, () => {
  console.log("Server is running successfully in port 5555");
});
