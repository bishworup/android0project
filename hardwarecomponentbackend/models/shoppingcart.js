const mongoose = require('mongoose');
const shoppingcartSchema =  new mongoose.Schema({
    usercart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    quantity:{
        type:Number
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }]
 
},{timestamps:true});

module.exports = mongoose.model('ShoppingCart',shoppingcartSchema);