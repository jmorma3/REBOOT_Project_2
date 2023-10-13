const jwt = require("jsonwebtoken")
const User = require("../api/models/user.model")
require("dotenv").config()

const checkAuth = (req, res, next)=>{
    if (req.headers.authorization){
        return res.status(404).send("Token not found")
    }
    jwt.verify(req.headers.authorization, procces.env.SECRET, async(error, payload)=>{
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
    if(!res.locals.user.role === "admin"){
        return res.status(401).json("Access not allowed")
    }else{
        next()
    }
}

const checkOwner = (req,res, next)=>{
    if(!res.locals.user.role === "owner" && !res.locals.user.role === "admin"){
        return res.status(401).json("Access not allowed")
    }else{
        next()
    }
}

module.exports = {
    checkAuth,
    checkAdmin, 
    checkOwner
}