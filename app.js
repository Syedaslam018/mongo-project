const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("64e6163094673f459dd95828")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.CONNECT_LINK)
  .then((result) => {
    console.log("connected to server!");
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "aslam",
          email: "aslam@test",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
