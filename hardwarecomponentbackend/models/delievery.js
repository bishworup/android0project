const mongoose = require('mongoose');
const delieverySchema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    quantity:{
        type:Number,
        required:true

    },
    totalprice:{
        type:Number,
        
    }
},{timestamps:true});

module.exports = mongoose.model('Delievery',delieverySchema);