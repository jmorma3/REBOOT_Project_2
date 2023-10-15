const jwt = require("jsonwebtoken")
const User = require("../api/models/user.model")
const Shop = require("../api/models/shop.model")
const Purchase = require('../api/models/purchase.model')
require("dotenv").config()

const checkAuth = (req, res, next)=>{
    if (!req.headers.authorization){
        return res.status(404).send("Token not found")
    }
    jwt.verify(req.headers.authorization, process.env.SECRET, async (error, payload)=>{
        if(error){
            return res.status(401).send("Token not valid!")
        }
        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })
        if(!user){
            return res.status(401).send("Token not valid")
        }
        res.locals.user = user
        next()
    })
}

const checkAdmin = (req,res, next)=>{
    if(res.locals.user.role !== "admin"){
        return res.status(401).json("Access not allowed")
    }else{
        next()
    }
}

const checkOwner = (req,res, next)=>{ 
    if(res.locals.user.role !== "owner" && res.locals.user.role !== "admin"){
        return res.status(401).json("Access not allowed")
    }else{
        next()
    }
}

/* const accessPurchase = async (req, res, next) =>{
    const purchaseNum = req.body.purchase_num;
    const user = res.locals.user;
    const userShop = await user.getShop()
    const purchaseShopId = await userShop.getPurchases()
    const purchase = await Purchase.findOne({
        where: {
            purchase_num: purchaseNum,
            shopId: userShop.id,
        },
    });

    console.log(purchaseNum)
    console.log(user.id)
    console.log(userShop)
    console.log(purchaseShopId)

    if (!purchase) {
        return res.status(403).send('No autorizado');
    } else {
        next();
    }
}; */

module.exports = {
    checkAuth,
    checkAdmin, 
    checkOwner,
    //accessPurchase
}