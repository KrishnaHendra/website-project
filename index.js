const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  const data = "<center><h1>Welcome to bitLogin!</h1></center>";
  res.send(data);
});

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
