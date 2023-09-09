const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  const data = "<center><h1>Welcome to bitLogin!</h1></center>";
  res.send(data);
});

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
