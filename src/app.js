const express = require("express");

const app = express();

// this will only handle get call to /user if /user?userId=100 then use req.query and get { userId: '100' }
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Mithun", lastName: "R" });
});

// this will only handle get call to /user/: by id /: means dynamic route
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Mithun", lastName: "R" });
});

// this will only handle get call to /user
app.post("/user", (req, res) => {
  console.log("User Data send to the database");
  res.send("USer Data Successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("user Deleted Successfully");
});
// the call back function is called as Request Handler
// this will match all the HTTP method API calls to /test
app.use("/hello", (req, res) => {
  res.send("Hello from the hello server");
});

app.listen(5555, () => {
  console.log("Server is running successfully in port 5555");
});
