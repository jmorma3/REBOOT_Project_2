const Shop = require("../models/shop.model")
const User = require("../models/user.model")

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

        if(user.role === 'owner'){
            await user.addShop(shop)
        } else {
            return res.status(404).send('User not owner')
        }

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
    createShop,
    createShopToUser,
    updateShop,
    deleteShop
}

