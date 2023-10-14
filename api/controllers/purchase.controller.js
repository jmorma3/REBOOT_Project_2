const Purchase = require("../models/purchase.model")
const Shop = require("../models/shop.model")

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.findAll(req.query)
        if (purchases) {
            return res.status(200).json(purchases)
        } else {
            return res.status(404).send("No purchases found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOnePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.findOne(req.params.purchaseNum)
        if (purchase) {
            return res.status(200).json(purchase)
        } else {
            return res.status(404).send("Purchase not found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createPurchase = async (req, res) => {
    try {
        const purchase = await Purchase.create({
            purchase_num: req.body.purchase_num,
            purchase_payment_method: req.body.purchase_payment_method,
            purchaseProductQuantity: req.body.purchaseProductQuantity,
            purchaseTotal: req.body.purchaseTotal, 
            productId: req.body.productId, 
        })

        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id
            }
        })

        await shop.addPurchase(purchase)

        return res.status(200).json({ message: 'Purchase created', purchase: purchase })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updatePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.update(req.body, {
            returning: true,
            where: {
                purchase_num: req.params.purchaseNum,
            },
        })
        if (purchase !== 0) {
            return res.status(200).json({ message: 'Purchase updated', purchase: purchase })
        } else {
            return res.status(404).send('Purchase not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deletePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.destroy({
            where: {
                purchase_num: req.params.purchaseNum,
            },
        })
        if (purchase) {
            return res.status(200).json('Purchase deleted')
        } else {
            return res.status(404).send('Purchase not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllPurchases,
    getOnePurchase,
    createPurchase,
    updatePurchase,
    deletePurchase
}

