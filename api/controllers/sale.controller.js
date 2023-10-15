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
      
      /*const updates = [];
        for (const saleProduct of req.body.saleProducts) {
        const product = products.find(products => product.id === saleProduct.productId);
        if (!product || product.quantityAvailable < saleProduct.quantity) {
          return res.status(400).send('No hay suficiente cantidad de producto disponible.');
        }
        updates.push({
          id: product.id,
          qtyAvailable: product.quantityAvailable - saleProduct.quantity,
        });
      }
      */const shop = await Shop.findOne({
        where: {
            userId: res.locals.user.id
        }
    })
    console.log(shop)
      const sale = await Sale.create({
        sale_num: req.body.sale_num,
        saleProductQuantity: req.body.saleProductQuantity,
        sale_payment_method: req.body.sale_payment_method,
        saleProducts: req.body.saleProducts,
        saleTotal: req.body.saleTotal,
        shopId: shop.dataValues.id
      });
      console.log(sale)
      const products = await shopProduct.findOne({
        where: {
          productId: req.body.saleProduct
        }
      });
      console.log(products)
      /*
      if (!sale) {
        return res.status(500).send('No se ha podido crear la venta.');
      }
      await Product.bulkCreate(updates, {
        updateOnDuplicate: ['qtyAvailable']
      });
  
      return res.status(200).json({ message: 'Venta realizada con éxito', sale: sale });*/
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

module.exports = {
    getAllSales,
    getOneSale,
    createSale,
    updateSale,
    deleteSale
}