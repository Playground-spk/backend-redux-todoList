const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
require("./config/passport");
const cors = require("cors");
const db = require("./models");

const UserRouter = require("./routes/User");
const TodoRouter = require("./routes/Todo");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", UserRouter);
app.use("/todo", TodoRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is running on Port" + process.env.PORT);
  });
});
