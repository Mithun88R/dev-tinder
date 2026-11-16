const express = require("express");

const app = express();

// the call back function is called as Request Handler

app.use("/hello", (req, res) => {
  res.send("Hello from the hello server");
});
app.use("/test", (req, res) => {
  res.send("Hello from  test server");
});

app.use((req, res) => {
  res.send("Hello Mithun!");
});

app.use("/", (req, res) => {
  res.send("welcome to the dashboard");
});

app.listen(5555, () => {
  console.log("Server is running successfully in port 5555");
});
