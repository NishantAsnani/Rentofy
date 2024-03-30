const express=require('express');
const router=express.Router()
const isAuth=require('../middleware')
const multer = require("multer");
const razorpay=require('razorpay');
const { storage, cloudinary } = require("../Cloudinary");
const product = require("../models/ProductData");
const upload = multer({ storage });
const user = require("../models/UserData");
const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_SECRET
});

router.get("/rent", isAuth, (req, res) => {
    res.render("Products/rent");
  });
  
  router.post("/rent", upload.single("image"), async (req, res) => {
    const ImageResult = await cloudinary.uploader.upload(req.file.path);
    const {description,price}=req.body;
    const Product = new product({
      image: ImageResult.url,
      description,
      price,
      author: req.session.user.id,
    });
    await Product.save()
      .then(() => {
        console.log("product added in database ");
      })
      .catch((e) => {
        console.log("Oh no some error occured ", e);
      });
    res.redirect("/products/show");
  });
  
  router.get("/show",isAuth, async (req, res) => {
    const productdata = await product.find({}).populate("author");
    const session = req.session.user;
    res.render("Products/show", { productdata, session});
  });
  
  router.post("/addproduct/:id",isAuth,async (req, res) => {
    const userId = req.session.user.id;
    const Prod = await product.findById(req.params.id);
    const USER = await user.findById(userId).populate("products");
    
    let result=USER.products.map(prod=>String(prod.id))
    if(!(result.includes(String(Prod.id))) ) 
    {
    USER.products.push(Prod);
    await USER.save();
    res.redirect('/products/cart');
    }
    else
    {
      console.log("Product already exists");
      return res.status(400).json({ msg: "Product already in cart" });
    }
  });
  
  
  router.get('/sort',isAuth,async(req,res)=>{
    const data = await product.find({})
    const session = req.session.user;
    const productdata=data.sort((a,b)=>a.price-b.price);
    res.render('Products/show',{productdata,session})
  })
  
  router.get("/cart",isAuth,async (req, res) => {
  const id=req.session.user.id
  const USER=await user.findById(id).populate("products");
  const cartItems=USER.products;
  let TotalPrice=0
  const prices=cartItems.map((item)=>item.price)
  
  for(let i=0;i<prices.length;i++)
  {
    TotalPrice+=prices[i];
  }
  res.render('Products/cart',{cartItems,TotalPrice});
  });
  
  router.get('/payment',isAuth,async(req,res)=>{
  const id=req.session.user.id
  const USER=await user.findById(id).populate("products");
  const cartItems=USER.products;
  let TotalPrice=0
  
  
  const prices=cartItems.map((item)=>item.price)
  
  for(let i=0;i<prices.length;i++)
  {
    TotalPrice+=prices[i];
  }
   res.render('Pages/Payment',{TotalPrice})
  })
  
  router.post('/removeitem/:id',isAuth,async (req,res)=>{
  
  const {id}=req.params;
  const uid=req.session.user.id
  const USER=await user.findById(uid).populate('products');
  await USER.products.pull({_id:id});
  await USER.save();
  res.redirect('/products/cart')
  })  
  
  router.post('/payment',isAuth,async(req,res)=>{
  const id=req.session.user.id;
  const removeItems=await user.findByIdAndUpdate(id,{
    products:[],
    function(err)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log("Update sucessful !!");
      }
    }
  })
  
  
    var data=(req.body);
    const amount=(parseInt(Object.keys(data)));
  var order = await razorpayInstance.orders.create({
      amount:amount*100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
  },()=>{
    res.json(order)
  }); 
  
  })
  
  router.get('/payed',isAuth,async (req,res)=>{
  res.render('Pages/payed');
  })

module.exports=router