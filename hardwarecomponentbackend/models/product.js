const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productname:
    {
        type: String,
        required: true
    },
    productdesc:
    {
        type: String,
       required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    pcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ProductCategory',
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model('Product', productSchema);