const Sale = require('../models/sale.model')
const Product = require('../models/product.model')
const Shop = require('../models/shop.model')
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [
                {
                    model: Product
                },
                {
                    model: Shop
                }
            ]
        })
        const customResponse = sales.map(sale => (`
            Sale Receipt
            -----------------
            Sale Number: ${ sale.sale_num }
            Sale Date: ${ sale.createdAt }
            Payment Method: ${ sale.sale_payment_method }
            Shop Name: ${ sale.shop.shopName }
            Product Name: ${ sale.product.productName }
            Product Price: ${ sale.product.price } €
            Product Quantity: ${ sale.saleProductQuantity }
            -----------------
        `
        )).join('\n')
        return res.status(200).send(customResponse)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneSale = async (req, res) => {
    try {
        const sale = await Sale.findAll({
            where:{
                sale_num: req.params.saleNum
            },
            include: [
                {
                    model: Product
                },
                {
                    model: Shop
                }
            ]
        })
        if (sale.length > 0){
            let saleNum
            let productsNamesArr = []
            
            sale.forEach( sale => {
                saleNum = sale.sale_num

                productsNamesArr.push(
                `
                Product Name: ${sale.product.productName}
                Product Price: ${sale.product.price}
                Sale Quantity: ${sale.saleProductQuantity}
                `
                )
            })

            let saleProductsNum = sale.reduce((sum, index) => {
                return sum + index.saleProductQuantity
            }, 0)

            let saleTotalPayment = sale.reduce((sum, index) => {
                return sum + index.saleTotal
            }, 0)

            const customOutput = `
            Sale Receipt
            -----------------
            Invoice Number: ${ saleNum }

            Saled Products: ${ productsNamesArr }
            Total Number of Products: ${ saleProductsNum }

            Total: ${ saleTotalPayment } €
            -----------------
            `

            return res.status(200).send(customOutput)
        } else {
            return res.status(404).send('Sale receipt number not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createSale = async (req, res) => {
    try {
        const userId = res.locals.user.id;

        const shop = await Shop.findOne({
            where: {
                userId: userId
            }
        });

        const saleData = req.body; // Suponemos que recibes datos de una venta en el cuerpo de la solicitud

        const sale = await Sale.create({
            sale_num: "INVOICE-2023-10-" + saleData.sale_num,
            saleProductQuantity: saleData.saleProductQuantity,
            sale_payment_method: saleData.sale_payment_method,
            saleTotal: saleData.saleTotal,
            shopId: shop.id,
            productId: saleData.productId,
            customerId: saleData.customerId
        });

        if (!sale) {
            return res.status(500).send('No se ha podido crear la venta.');
        }

        const customResponse = `
        Venta creada exitosamente
        -------------------------
        Número de Venta: ${sale.sale_num}
        Cantidad de Productos: ${sale.saleProductQuantity}
        Método de Pago: ${sale.sale_payment_method}
        Total de la Venta: ${sale.saleTotal} €
        -------------------------
        `;

        return res.status(200).send(customResponse);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};


const updateSale = async (req, res) => {
    try {
        const [sale] = await Sale.update(req.body, {
            where: {
                sale_num: req.params.saleNum
            }
        })
    
        if (!sale){
            return res.status(404).send('Sale not found')
        }
        return res.status(200).json({ message: 'Sale updated' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.destroy({
            where: {
                sale_num: req.params.saleNum
            }
        })

        if (!sale){
            return res.status(404).send('Sale not found')
        }

        return res.status(200).json({ message: 'Sale deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOwnerAllSales = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id,
            },
        })
        const sales = await Sale.findAll({
            where: {
                shopId: shop.id
            },
        })

        if (sales.length === 0) {
            return res.status(404).send('No sales found for this shop')
        }
        const customResponse = `
        Sales for this shop
        -------------------
        ${sales.map(sale => 
        `Sale Number: ${ sale.sale_num }
        Sale Quantity: ${ sale.saleProductQuantity }
        Payment Method: ${ sale.sale_payment_method }
        Total Sale Amount: ${ sale.saleTotal } €
        -------------------
        `).join('\n')}
        `
         return res.status(200).send(customResponse)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOwnerOneSale = async (req, res) => {
    try {
        const shop = await Shop.findOne({
            where: {
                userId: res.locals.user.id,
            },
        })
        const sale = await Sale.findOne({
            where: {
                sale_num: req.params.saleNum,
                shopId: shop.id
            },
        })

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found for this shop.' });
        }

        // Create a custom response with sale information
        const customResponse = `
            Sale Information
            ----------------
            Sale Number: ${sale.sale_num}
            Sale Quantity: ${sale.saleProductQuantity}
            Payment Method: ${sale.sale_payment_method}
            Total Sale Amount: ${sale.saleTotal} €
            ----------------
        `;

        return res.status(200).send(customResponse);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllSales,
    getOneSale,
    createSale,
    updateSale,
    deleteSale,
    getOwnerAllSales,
    getOwnerOneSale
}