const mongoose=require('mongoose');
const {Schema}=mongoose


const userData=new Schema({
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
    address:{
        type:String,
        required:true
    },
    Profile_Pic:{
        type:String,
        required:true
    },
    products:
    [
        {
            type:Schema.Types.ObjectId,
            ref:'product'
        }
    ]
})
const user=mongoose.model('user',userData)

module.exports=user