const Product = require("../models/product.model")
const Purchase = require("../models/purchase.model")
const Shop = require("../models/shop.model")
const Supplier = require("../models/supplier.model")
const shopProduct = require("../models/shopProduct.model")

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.findAll({
            include: {
                model: Product
            }
        })
        if (purchases) {
            const customResponse = purchases.map(purchase => (`
                Purchase Receipt
                -----------------
                Purchase Number: ${ purchase.purchase_num }
                Payment Method: ${ purchase.purchase_payment_method }
                Product Name: ${ purchase.product.productName }
                Product Price: ${ purchase.product.price } €
                Product Quantity: ${ purchase.purchaseProductQuantity }

                Total: ${ purchase.purchaseTotal } €
                -----------------
            `
            )).join('\n')
            return res.status(200).send(customResponse)
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
                - Product: ${purchase.dataValues.product.productName}
                - Price: ${purchase.dataValues.product.price} €
                - Quantity Purchased: ${purchase.dataValues.purchaseProductQuantity}
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

            const customOutput = `
            Purchase Receipt
            -----------------
            Invoice Number: ${purchaseNUM}
            Purchased Products: ${productsNamesArr}
            Total Number of Products: ${purchasedProductsNum}
            Total: ${purchaseTotalPayment} €
            -----------------
            `

            return res.status(200).send(customOutput)

        } else {
            return res.status(404).send("Nº de factura no encontrado!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createPurchase = async (req, res) => {
    try { 
        const userId = res.locals.user.id

        const shop = await Shop.findOne({
            where: {
                userId: userId
            }
        })
        /* 
        const existingPurchaseNum = await Purchase.findOne({
            where:{
                purchase_num: "FACTURA-2023-10-" + req.body.purchase_num,
                shopId: shop.id
            }
        })
        
        console.log(existingPurchaseNum.purchase_num) 
        */

        const product = await Product.findOne({
            where: {
                id: req.body.productId
            }
        })
        //Cantidad de producto requerido (pasado por el body):
        const qtyRequired = req.body.purchaseProductQuantity

        if (product.qtyAvailable > 0 && qtyRequired <= product.qtyAvailable) {

            const purchase = await Purchase.create({
                purchase_num: "INVOICE-2023-10-" + req.body.purchase_num,
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

            const supplier = await Supplier.findOne({
                where: {
                    id: product.supplierId
                }
            })

            // Actualizar la cantidad de producto comprado en la tabla de "shopProduct":
            await shopProduct.update({ quantityAvailable: req.body.purchaseProductQuantity }, {
                returning: true,
                where: {
                    productId: req.body.productId
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
            return res.status(200).json({ message: 'Purchase updated' })
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

