const mongoose=require('mongoose');
const OfferSchema=mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }  
})


  const Offer = mongoose.model('Offer', OfferSchema);
  module.exports = Offer;

