if(process.env.NODE_ENV !=="production")
{
    require('dotenv').config();
}

const mongoose=require('mongoose')
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const user=require('./models/UserData')
const bcrypt=require('bcrypt')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoDBStore = require("connect-mongodb-session")(session)
const MAX_AGE=1000 * 60 * 60 * 300
const productSchema=require('./models/ProductData')
const path=require('path')
const multer=require('multer')
const {storage, cloudinary}=require('./Cloudinary');
const product=mongoose.model('product',productSchema)
const upload=multer({storage});

const url='mongodb://127.0.0.1:27017/DE_Project'



app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin:'http://localhost:3000', credentials:true,exposedHeaders:['Set-Cookie', 'Date', 'ETag']}))
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cookieParser())

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect(url)
.then(()=>{
    console.log('Connected to mongoose')
}).catch((e)=>{
    console.log("Oh no !! error",e)
})


const mongoDBStore=new MongoDBStore({
    uri:url,
    collections:'mySessions',
})


app.use(session({
    secret:process.env.COOKIE_SECRET,
    store:mongoDBStore,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:MAX_AGE
    }
}));

const isAuth=(req,res,next)=>{
    if(req.session.user)
    {
        next();
    }
    else
    {
        res.redirect('/Login')
    }

}

app.post('/Signup',upload.single('Profile_Pic'),async (req,res)=>{
    const {Firstname,Surname,email,Contact,password,Day,Month,Year}=req.body
    const ImageResult=await cloudinary.uploader.upload(req.file.path)
    const Duplicate=await user.findOne({email});
    if(Duplicate)
    {
        console.log('User already exists')
        return res.status(400).json({msg:'User already exists'});
    }
    else
    {


    const HashPassword=await bcrypt.hash(password,12)
    const User=new user({
        Firstname,
        Surname,
        email,
        Contact,
        password:HashPassword,
        Day,
        Month,
        Year,
        Profile_Pic:ImageResult.url
    })
    await User.save().then(()=>{
        console.log('user added ')
    }).catch((e)=>{
        console.log('Error adding a user ',e)
    })
    res.redirect('Login')
    return;

    }
})


app.post('/rent',upload.single('image'),async (req,res)=>{
    const ImageResult=await cloudinary.uploader.upload(req.file.path) 
    const Product=new product({
        image:ImageResult.url,
        description:req.body.description,
        price:req.body.price,
        author:req.session.user.id
    })
    await Product.save()
    .then(()=>{
        console.log("product added in database ")
    })
    .catch((e)=>{
        console.log("Oh no some error occured ",e);
    })
    res.redirect('/show')
    })

app.post('/Login',async(req,res)=>{
    const {email,password}=req.body;
    
    const User=await user.findOne({email});
    
     if(!User)
    {
         res.status(404).json({msg:'Data not found'}) 
         return
    }
       
    const validPassword=await bcrypt.compare(password,User.password);
    if(validPassword)
    {
        const sessUser={
            id:User.id,
            email:User.email,
            password:User.password,
            Firstname:User.Firstname,
            Profile_Pic:User.Profile_Pic
        }
        req.session.user=sessUser
        res.redirect('/Main')  
        console.log("validPassword")  
    }
    else
    {
        res.status(500).json({msg:"Not done"}) 
        return  
    }
})





app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/Home')
    })
})


app.post('/user/:id',async (req,res)=>{
    const {id}=req.params
    const userinfo=await user.findById(id);
    res.render('Pages/Profile',{userinfo})
})

app.get('/',(req,res)=>{
    res.render('Pages/FirstPage')
})

app.get('/Login',(req,res)=>{
    console.log(req.query);
    res.render('Pages/Login')
})

app.get('/Home',(req,res)=>{
    const session=req.session.user;
    res.render('Pages/Home',{session})
})

app.get('/Signup',(req,res)=>{
    res.render('Pages/Signup')
})

app.get('/Main',isAuth,(req,res)=>{
    const loggedInUser=req.session.user;
    res.render('Pages/Main',{loggedInUser})
})




//Product Routes


app.get('/rent',isAuth,(req,res)=>{
    res.render('Products/rent')
})


app.get('/show',isAuth,async (req,res)=>{
    const productdata=await product.find({}).populate('author')
    const sessionId=req.session.user.id
    console.log(sessionId)
    res.render('Products/show',{productdata,sessionId})
})






app.listen(3001,()=>{
    console.log('Listening to port 3001')
})