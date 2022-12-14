const mongoose=require('mongoose');


const userData=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    Contact:{
        type:Number,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    Day:{
        type:Number,
        required:true
    },
    Month:{
        type:String,
        required:true
    },
    Year:{
        type:String,
        required:true
    },   
})
const user=mongoose.model('user',userData)

module.exports=user