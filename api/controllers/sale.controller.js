const Sale = require('../models/sale.model')
const Product = require('../models/product.model')
const Shop = require('../models/shop.model')
const shopProduct = require('../models/shopProduct.model')
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.findAll(req.query)
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneSale = async (req, res) => {
    try {
        const sale = await Sale.findOne({
            where:{
                sale_num: req.params.saleNum
            }
        })
        if (!sale) {
            return res.status(404).send('Sale not found')
        }
        return res.status(200).json(sale)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createSale = async (req, res) => {
    try {
      
      const shop = await Shop.findOne({
        where: {
            userId: res.locals.user.id
        }
    })
      const sale = await Sale.create({
        sale_num: req.body.sale_num,
        saleProductQuantity: req.body.saleProductQuantity,
        sale_payment_method: req.body.sale_payment_method,
        saleTotal: req.body.saleTotal,
        shopId: shop.dataValues.id,
        productId: req.body.productId,
        customerId:req.body.customerId
      });
      if (!sale) {
        return res.status(500).send('No se ha podido crear la venta.');
      }
      return res.status(200).json({ message: 'Venta realizada con éxito', sale: sale });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const updateSale = async (req, res) => {
    try {
        const [sale] = await Sale.update(req.body, {
            where: {
                saleNum: req.params.saleNum
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
                saleNum: req.params.saleNum
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
         return res.status(200).json({ sales })
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

        return res.status(200).json({ sale })
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