const express = require('express');
const Product = require('../models/product');
const product = require('../models/product');

const router = express.Router();
router.route('/')
//retreveing all the product from the database
.get((req,res,next)=>{
    Product.find({})
    .then((product)=>{
        status=200;
        res.json(product);

    })
    .catch((err)=>next(err));

})
 //inserting  new product to the database
.post((req,res,next)=>{
    Product.create(req.body)
    .then((product)=>{
        res.status=200;
        res.json(product);
    })
    .catch((err) => next(err));



})
//cannot update all the  product
.put((req,res,next)=>{
    res.statusCode=201;
    res.json("You cannot update product");

})
 //deleting  All product from database
.delete((req,res,next)=>{
    Product.deleteMany({})
    .then((product)=>{
        res.json(product);

    })
});

 //Getting particular product by id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Product.findById(req.params.id)
    .populate('product','productcategory')
     .then((product)=>{
        res.json(product);
     })
     .catch((err) => next(err));
 })

 //cannot post the product
 .post((req,res,next)=>{
     res.statusCode=201;
     res.json("You cannot add product again on here");
 })
 //Updating the particular product by id

 .put((req,res,next)=>{
    Product.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((product)=>{
         res.json(product);

     })
     .catch((err)=> next(err));
 })

 // Deleting particular product by id

 .delete((req,res,next)=>{
    Product.findByIdAndDelete(req.params.id)
     .then((product)=>{
         res.json(product);
     })
     .catch((err)=> next(err));
 })

module.exports= router;



