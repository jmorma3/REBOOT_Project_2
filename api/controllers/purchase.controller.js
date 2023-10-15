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
        const purchaseArr = await Purchase.findAll({
            where: {
                purchase_num: req.params.purchaseNum
            }, include:{
                model: Product
            }
        })

        if (purchaseArr.length > 0) {
            //Manejo del array:
            let purchaseNUM 
            let productsNamesArr = []

            purchaseArr.forEach((purchase) => {
                 //Número de factura:
                purchaseNUM = purchase.dataValues.purchase_num
                //Nombre, precio y cantidad de productos comprados:
                productsNamesArr.push(
                    `
                     - Producto: ${purchase.dataValues.product.productName} 
                     - Precio: ${purchase.dataValues.product.price} €
                     - Cantidad comprada: ${purchase.dataValues.purchaseProductQuantity}
                     `
                     )
            })

            //Suma total de artículos:
            let purchasedProductsNum = purchaseArr.reduce((sum, index) => {
                return sum + index.dataValues.purchaseProductQuantity
            }, 0)

            //Suma total de €:
            let purchaseTotalPayment = purchaseArr.reduce((sum, index) => {
                return sum + index.dataValues.purchaseTotal
            }, 0)

            return res.status(200).send(`
                Número de factura: ${purchaseNUM}
                Productos comprados: ${productsNamesArr}
                Número total de productos: ${purchasedProductsNum}
                TOTAL: ${purchaseTotalPayment} €
            `)

        } else {
            return res.status(404).send("Nº de factura no encontrado!")
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
        //Cantidad de producto requerido (pasado por el body):
        const qtyRequired = req.body.purchaseProductQuantity

        if (product.qtyAvailable > 0 && qtyRequired <= product.qtyAvailable) {

            const purchase = await Purchase.create({
                purchase_num: "FACTURA-2023-10-" + req.body.purchase_num,
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

            await shop.addPurchase(purchase)
            await shop.addProduct(product)
            await supplier.addPurchase(purchase)

            return res.status(200).send(`${qtyRequired} de ${product.productName} añadido/s a tu compra con factura Nº: ${purchase.purchase_num}`)
        } else {
            return res.send(`No hay suficiente ${product.productName} disponible!`)
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

