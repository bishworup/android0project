const express = require('express');
const ShoppingCart = require('../models/shoppingcart');
const auth = require("../auth");

const router = express.Router();

router.get("/",auth.verifyUser,(req,res, next)=>{
    ShoppingCart.find({usercart:req.user._id})
    .then((shoppingcart)=>{
        res.json(shoppingcart);
    }).catch((error)=>next(error))
})

router.post("/",auth.verifyUser,(req,res,next)=>{
    let shoppingcart = new ShoppingCart(req.body);
    shoppingcart.usercart = req.user;
    shoppingcart.save().then((shoppingcart)=>{
        res.statusCode = 201;
        res.json(shoppingcart);
    }).catch(next);
})

router.route('/')
    // .post(auth.verifyUser,(req, res, next) => {
    //     let ShoppingCart = new Task(req.body);
    //     ShoppingCart.userShoppingCart = req.user._id;
    //     ShoppingCart.save()
    //         .then((ShoppingCart) => {
    //             res.statusCode = 201;
    //             res.json(task);
    //         }).catch(next);
    // })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete((req, res, next) => {
        ShoppingCart.deleteMany({ usercart: req.user._id })
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        ShoppingCart.findOne({ usercart: req.user._id, _id: req.params.id })
            .then((shoppingcart) => {
                if (shoppingcart == null) throw new Error("ShoppingCart not found!")
                res.json(task);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        ShoppingCart.findOneAndUpdate({ userart: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((shoppingcart) => {
                if (shoppingcart== null) throw new Error("ShoppingCart not found!");
                res.json(shoppingcart);
            }).catch(next);
    })
    .delete((req, res, next) => {
        ShoppingCart.findOneAndDelete({ user: req.user._id, _id: req.params.id })
            .then((shoppingcart) => {
                if (shoppingcart== null) throw new Error("ShoppingCart not found!");
                res.json(shoppingcart);
            }).catch(next);
    });


module.exports = router;