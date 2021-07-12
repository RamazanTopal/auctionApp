const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offer:{
        type:Number
    },
    offerer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer"
    }]
    ,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    start_date:{
        type:Date,
        default:Date.now()
    }
})


  const Product = mongoose.model('Product', ProductSchema);
  module.exports = Product;

