const router = require('express').Router()

const { 
    getAllSales, 
    getOneSale, 
    createSale, 
    updateSale, 
    deleteSale 
} = require('../controllers/sale.controller')


router
    .get('/', getAllSales)
    .get('/:saleNum', getOneSale)
    .post('/', createSale)
    .put('/:saleNum', updateSale)
    .delete('/:saleNum', deleteSale)

module.exports = router