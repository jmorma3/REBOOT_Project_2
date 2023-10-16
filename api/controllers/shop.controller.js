const Shop = require("../models/shop.model")
const User = require("../models/user.model")
const shopProduct = require("../models/shopProduct.model")
const Product = require("../models/product.model")
const Purchase = require("../models/purchase.model")



const getOwnPurchaseHistory = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id,
            },
        })

        if (shop) {
            const purchases = await Purchase.findAll({
                where: {
                    shopId: shop.id,
                },
            })
            return res.status(200).json({ purchases })
        } else {
            return res.status(404).send('Shop not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



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
        const productsArr = await shop.getProducts()
        let productName
        let productDescription
        let productPrice
        let productQuantity

        let productsNamesArr = []

        productsArr.forEach((product) => {
            productName = product.dataValues.productName
            productDescription = product.dataValues.productDescription
            productPrice = product.dataValues.price
            productQuantity = product.dataValues.shopProduct.dataValues.quantityAvailable

            productsNamesArr.push(`
                Product name: ${productName}
                Description: ${productDescription}
                Price: ${productPrice} 
                Quantity: ${productQuantity}
            `)
        })

        const shopName = shop.dataValues.shopName
        const shopCategory = shop.dataValues.shopCategory


        if (!shop) {
            return res.status(404).send('You dont have a shop!')
        }
        return res.status(200).send(`
        Mi tienda es la mejor

        ${shopName} 

        ${shopCategory} 

        ${productsNamesArr}
        `)
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



const updateOwnShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id
            },
        })
        if (shop) {
            await Shop.update(req.body, {
                returning: true,
                where: {
                    id: shop.id
                },
            })

            return res.status(200).json({ message: 'Own Shop updated' })
        } else {
            return res.status(404).send('Own Shop not found')
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

const deleteOwnShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id,
            },
        })
        if (shop) {
            await shop.destroy()
            return res.status(200).json('Own Shop deleted')
        } else {
            return res.status(404).send('Own Shop not found')
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
    deleteShop,
    updateOwnShop,
    deleteOwnShop,
    getOwnPurchaseHistory
}

