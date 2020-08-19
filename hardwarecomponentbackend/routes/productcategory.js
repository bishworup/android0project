const express = require('express');
const mongoose = require('mongoose');
const ProductCategory = require('../models/productcategory');
const auth = require('../auth');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
   ProductCategory.find({})
    .then((category)=>{
        res.json(category);
    })
    .catch(next);
})
.post((req,res,next)=>{
    ProductCategory.create(req.body)                           
    .then((category)=>{
        res.statusCode = 201;
        res.json(category);
    })
    .catch(next);
})
.put((req,res,next)=>{
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete(auth.verifyAdmin,(req,res,next)=>{
   ProductCategory.deleteMany({})
    .then((category)=>{
        res.json(category);
    })
    .catch(next);
});

router.route('/:id')
.get((req, res, next) => {
   ProductCategory.findOne({ author: req.user._id, _id: req.params.id })
        .then((category) => {
            if (category == null) throw new Error("Productcategory not found!")
            res.json(category);
        }).catch(next);
})
.post((req,res,next)=>{
    res.statusCode = 405;
    res.send("Cannot post again!!!");
})

.put((req, res, next) => {
   ProductCategory.findOneAndUpdate({ author: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
        .then((category) => {
            if (category== null) throw new Error("Productcategory not found!");
            res.json(category);
        }).catch(next);
})

.delete((req, res, next) => {
    ProductCategory.findOneAndDelete({ author: req.user._id, _id: req.params.id })
        .then((category) => {
            if (category == null) throw new Error("Productcategory not found!");
            res.json(category);
        }).catch(next);
});

module.exports = router;