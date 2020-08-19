const express = require('express');
const mongoose = require('mongoose');
const Delievery = require('../models/delievery');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    Delievery.find({})
    .then((order)=>{
        res.statusCode = 200;
        res.json(order);
    })
})
.post((req,res,next)=>{
    Delievery.create(req.body)
    .then((order)=>{
        res.statusCode = 201;
        res.json(order);
    })
})
.put((req,res,next)=>{
    res.send("Cannot update!!!");
})
.delete((req,res,next)=>{
    Delievery.deleteMany({})
    .then((order)=>{
        res.send("Deleted Succesfully!!!");
    })
});

router.route('/:id')
.get((req,res,next)=>{
    Delievery.findById(req.params.id)
    .then((order)=>{
        
        res.statusCode = 200;
        res.json(order);
    })
})
.post((req,res,next)=>{
    res.send("Cannot post !!!");
})
.put((req,res,next)=>{
    Delievery.findByIdAndUpdate(req.body.id,{$set: req.body},{new:True})
    .then((order)=>{
        res.statusCode = 200;
        res.json(order);
    })
})
.delete((req,res,next)=>{
    Delievery.findByIdAndDelete(req.body.id)
    .then((order)=>{
        res.send("Deleted succefully !!!");
    })
})

module.exports = router;