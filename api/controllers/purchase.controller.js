const Product = require("../models/product.model")
const Purchase = require("../models/purchase.model")
const Shop = require("../models/shop.model")
const Supplier = require("../models/supplier.model")
const User = require("../models/user.model")

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
        const purchase = await Purchase.findAll({
            where: {
                purchase_num: req.params.purchaseNum
            }, 
            include: Shop, 
            through:{
                attributes: [Shop.name,Shop.]
            }
        })
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
        const product = await Product.findOne({
            where: {
                id: req.body.productId,
            }
        })

        const qtyRequired = req.body.purchaseProductQuantity

        if (product.qtyAvailable > 0 && qtyRequired <= product.qtyAvailable) {
           
            const purchase = await Purchase.create({
                purchase_num: "FACTURA-2023-10-"+req.body.purchase_num,
                purchase_payment_method: req.body.purchase_payment_method,
                purchaseProductQuantity: qtyRequired,
                purchaseTotal: (product.price * req.body.purchaseProductQuantity),
                productId: req.body.productId
            })

            await product.update({ qtyAvailable: (product.qtyAvailable - req.body.purchaseProductQuantity) }, {
                returning: true,
                where: {
                    id: req.params.productId
                },

            })

            const shop = await Shop.findOne({
                where: {
                    userId: res.locals.user.id
                }
            })
            const supplier = await Supplier.findOne({
                where: {
                    id: product.supplierId
                }
            })

            await shop.addProduct(product)
            await shop.addPurchase(purchase)
            await supplier.addPurchase(purchase)
            await purchase.addProduct(product)

            return res.status(200).json({ message: 'Purchase created', purchase: purchase })
        } else {
            return res.send(`No enough ${product.productName} available!`)
        }

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

