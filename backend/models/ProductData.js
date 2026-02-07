const mongoose=require('mongoose')
const{Schema}=mongoose;

const ProductSchema=Schema({
    image:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    author:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:'user'
    }
})

const product=mongoose.model('product',ProductSchema)

module.exports=product

