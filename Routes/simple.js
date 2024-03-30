const express=require('express');
const router=express.Router()
const isAuth=require('../middleware')
const multer = require("multer");
const { storage, cloudinary } = require("../Cloudinary");
const upload = multer({ storage });
const user = require("../models/UserData");
const bcrypt = require("bcrypt");
const session = require("express-session");




router.post("/Signup",upload.single("Profile_Pic"), async (req, res) => {
    const ImageResult = await cloudinary.uploader.upload(req.file.path);
    const Duplicate = await user.findOne({email:req.body.email});
    if (Duplicate) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    } 
  
    else {
      const HashPassword = await bcrypt.hash(req.body.password,12);
      const User = new user({
        ...req.body,
        password: HashPassword,
        Profile_Pic: ImageResult.url,
      });
      await User.save()
        .then(() => {
          console.log("user added ");
        })
        .catch((e) => {
          console.log("Error adding a user ", e);
        });
      res.redirect("Login");
      return;
    }
  });
  
  
  
  router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
  
    if (!User) {
      res.status(404).json({ msg: "Data not found" });
      return;
    }
  
    const validPassword = await bcrypt.compare(password, User.password);
    if (validPassword) {
      const sessUser = {
        id: User.id,
        email: User.email,
        Firstname: User.Firstname,
        Profile_Pic: User.Profile_Pic,
      };
      req.session.user = sessUser;
      res.redirect("/Main");
    } else {
      res.status(500).json({ msg: "Invalid username or password" });
      return;
    }
  });
  
  router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/Home");
    });
  });
  
  router.post("/user/:id", async (req, res) => {
    const { id } = req.params;
    const userinfo = await user.findById(id)
    res.render("Pages/Profile", { userinfo });
  });
  
  router.get("/", (req, res) =>{
    res.render("Pages/FirstPage");
  });
  
  router.get("/Login", (req, res) => {
    res.render("Pages/Login");
  });
  
  router.get("/Home", (req, res) => {
    const session = req.session.user;
    res.render("Pages/Home", { session });
  });
  
  router.get("/Signup", (req, res) => {
    res.render("Pages/Signup");
  });
  
  router.get("/Main", isAuth, (req, res) => {
    const loggedInUser = req.session.user;
    res.render("Pages/Main", { loggedInUser });
  });


module.exports=router;