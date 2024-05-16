const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Middleware function (create a log)
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); //move to next phase
};
app.use(logRequest);
app.use(passport.initialize());

const MenuItem = require("./models/MenuItem");

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Welcome to my hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
app.use("/person", localAuthMiddleware, personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menuItem", localAuthMiddleware, menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //address of port
  console.log("server is ON  !!!!!");
});
