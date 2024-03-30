if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const productRoutes=require('./Routes/products')
const simpleRoutes=require('./Routes/simple')
const path=require('path');
const bodyParser=require('body-parser')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MAX_AGE = 1000 * 60 * 60 * 300;
const url = process.env.CONNECTION_URL;

const mongoDBStore = new MongoDBStore({
  uri:url,
  collections: "mySessions",
});

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    store: mongoDBStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
    },
  })
);

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/products',productRoutes)
app.use('/',simpleRoutes)
app.use(mongoSanitize());
app.use(express.static(__dirname + "/public"));


// Setting staic files and template engine
app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");


// Connection with Database
mongoose.connect(url)
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((e) => {
    console.log("Oh no !! error", e);
  });

 





app.listen(3001, () => {
  console.log("Listening to port 3001");
});