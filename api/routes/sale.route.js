const router = require('express').Router()

const { 
    getAllSales, 
    getOneSale, 
    createSale, 
    updateSale, 
    deleteSale,
    getOwnerAllSales,
    getOwnerOneSale
} = require('../controllers/sale.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllSales)
    .get('/profile', getOwnerAllSales)
    .get('/profile/:saleNum', getOwnerOneSale)
    .get('/:saleNum', checkAdmin, getOneSale)
    .post('/', createSale)
    .put('/:saleNum', checkAdmin,  updateSale)
    .delete('/:saleNum', checkAdmin, deleteSale)

module.exports = router