const express = require("express");
const cors = require("cors");
const router = require("./routes/emailRouter");
var bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", router);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

app.listen(process.env.PORT, function () {
  console.log("hello");
  console.log("Node app is running on port");
});
