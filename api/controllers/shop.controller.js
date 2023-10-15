const Shop = require("../models/shop.model")
const User = require("../models/user.model")
const shopProduct = require("../models/shopProduct.model")
const Product = require("../models/product.model")

const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.findAll(req.query)
        if (shops) {
            return res.status(200).json(shops)
        } else {
            return res.status(404).send("No shops found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneShop = async (req, res) => {
    try {
        const shop = await Shop.findByPk(req.params.shopId)
        if (shop) {
            return res.status(200).json(shop)
        } else {
            return res.status(404).send("Shop not found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOwnShopInfo = async (req, res) => {
    try {
       
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id
            },
            include: {
                model: Product,
                attributes: []
             }
            })

        //Manejo del array:
        const productsArr = await shop.getProducts()
        
        productsArr.forEach((product)=>{
            console.log("Info del array:")
            console.log(product.dataValues.productName)
            console.log(product.dataValues.productDescription)
            console.log(product.dataValues.price)
            console.log(product.dataValues.shopProduct.dataValues.quantityAvailable)
        })
        
        if(!shop){
            return res.status(404).send('You dont have a shop!')
        }
        return res.status(200).json({ shop })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createShop = async (req, res) => {
    try {
        const shop = await Shop.create({
            shopName: req.body.shopName,
            shopCategory: req.body.shopCategory
        })

        return res.status(200).json({ message: 'Shop created', shop: shop })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createShopToUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)

        const shop = await Shop.create({
            shopName: req.body.shopName,
            shopCategory: req.body.shopCategory
        })
        
        await user.setShop(shop)

        return res.status(200).json({ message: 'Shop created', shop: shop })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateShop = async (req, res) => {
    try {
        const shop = await Shop.update(req.body, {
            returning: true,
            where: {
                id: req.params.shopId,
            },
        })
        if (shop !== 0) {
            return res.status(200).json({ message: 'Shop updated', shop: shop })
        } else {
            return res.status(404).send('Shop not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteShop = async (req, res) => {
    try {
        const shop = await Shop.destroy({
            where: {
                id: req.params.shopId,
            },
        })
        if (shop) {
            return res.status(200).json('Shop deleted')
        } else {
            return res.status(404).send('Shop not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllShops,
    getOneShop,
    getOwnShopInfo,
    createShop,
    createShopToUser,
    updateShop,
    deleteShop
}

