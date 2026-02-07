const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const { storage, cloudinary } = require("../Cloudinary");
const Product = require("../models/ProductData");
const User = require("../models/UserData");
const isAuth = require("../middleware");

const upload = multer({ storage });

router.get("/products", async (req, res) => {
  const products = await Product.find({}).populate("author", "Firstname Profile_Pic");
  res.json(products);
});

router.get("/auth/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json(req.session.user);
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const found = await User.findOne({ email });

  if (!found) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, found.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = {
    id: found.id,
    email: found.email,
    Firstname: found.Firstname,
    Profile_Pic: found.Profile_Pic,
  };

  res.json(req.session.user);
});

router.post("/auth/signup", upload.single("Profile_Pic"), async (req, res) => {
  const duplicate = await User.findOne({ email: req.body.email });
  if (duplicate) {
    return res.status(400).json({ message: "User already exists" });
  }

  const image = req.file ? await cloudinary.uploader.upload(req.file.path) : null;
  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const created = new User({
    ...req.body,
    password: hashPassword,
    Profile_Pic: image?.url,
  });

  await created.save();
  res.status(201).json({ message: "Signup successful" });
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/cart", isAuth, async (req, res) => {
  const user = await User.findById(req.session.user.id).populate("products");
  const items = user.products;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  res.json({ items, totalPrice });
});

router.post("/cart/:id", isAuth, async (req, res) => {
  const currentUser = await User.findById(req.session.user.id).populate("products");
  const prod = await Product.findById(req.params.id);

  const exists = currentUser.products.map((item) => String(item.id)).includes(String(prod.id));
  if (exists) {
    return res.status(400).json({ message: "Product already in cart" });
  }

  currentUser.products.push(prod);
  await currentUser.save();
  res.status(201).json({ message: "Added to cart" });
});

router.delete("/cart/:id", isAuth, async (req, res) => {
  const currentUser = await User.findById(req.session.user.id).populate("products");
  await currentUser.products.pull({ _id: req.params.id });
  await currentUser.save();
  res.json({ message: "Removed from cart" });
});

router.post("/products", isAuth, upload.single("image"), async (req, res) => {
  const image = req.file ? await cloudinary.uploader.upload(req.file.path) : null;
  const { description, price } = req.body;

  const created = new Product({
    image: image?.url,
    description,
    price,
    author: req.session.user.id,
  });

  await created.save();
  res.status(201).json(created);
});

module.exports = router;
