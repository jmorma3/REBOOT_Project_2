const Sale = require('../models/sale.model')

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
        const sale = await Sale.findOne(req.params.saleNum)
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
        const existingSale = await Sale.findOne({ where: req.body.sale_num })

        if(existingSale){
            return res.status('409').send('Sale already exists')
        }

        const sale = await Sale.create({
            sale_num: req.body.sale_num,
            sale_payment_method: req.body.payment_method,
            saleProductQuantity: req.body.saleProductQuantity,
            saleTotal: req.body.total
        })

        return res.status(200).json({ message: 'Sale created', sale: sale })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

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