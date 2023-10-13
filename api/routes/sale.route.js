const router = require('express').Router()

const { 
    getAllSales, 
    getOneSale, 
    createSale, 
    updateSale, 
    deleteSale 
} = require('../controllers/sale.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllSales)
    .get('/:saleNum', getOneSale)
    .post('/', createSale)
    .put('/:saleNum', checkAdmin,  updateSale)
    .delete('/:saleNum', checkAdmin, deleteSale)

module.exports = router