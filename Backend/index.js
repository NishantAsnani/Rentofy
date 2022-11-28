const mongoose=require('mongoose')
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const user=require('./models/UserData')
const bcrypt=require('bcrypt')


const url='mongodb://localhost:27017/DE_Project'



app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(bodyParser.json()) 


mongoose.connect(url).then(()=>{
    console.log('Connected to mongoose')
}).catch((e)=>{
    console.log("Oh no !! error",e)
})


app.listen(3001,()=>{
    console.log('Listening to port 3001')
})

app.post('/SignUp',async (req,res)=>{
    const {Firstname,Surname,email,Contact,password,Day,Month,Year}=req.body
    const HashPassword=await bcrypt.hash(password,12)
    const User=new user({
        Firstname,
        Surname,
        email,
        Contact,
        password:HashPassword,
        Day,
        Month,
        Year
    })
    User.save().then(()=>{
        console.log('user added ')
    }).catch((e)=>{
        console.log('Error adding a user ',e)
    })
})


app.post('/LogIn',async(req,res)=>{
    const {email,password}=req.body;
    
    const User=await user.findOne({email});
    
    console.log(User);
    
     if(!User)
    {
         res.status(404).json({msg:'Data not found'}) 
         console.log(res.msg)
    }
       
    const validPassword=await bcrypt.compare(password,User.password);
    if(validPassword)
    {
        res.status(200).json({msg:"Done"})  
        console.log("validPassword")  
    }
    else
    {
        res.status(500).json({msg:"Not done"}) 
        console.log(res.msg)
        console.log("Invalid")  
    }
})