const router = require('express').Router()

const { getAllPurchases, getOnePurchase, createPurchase, updatePurchase, deletePurchase } = require('../controllers/purchase.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllPurchases)
    .get('/:purchaseNum', checkAdmin, getOnePurchase)
    .post('/', createPurchase) //accessPurchase - Pending
    .put('/:purchaseNum', checkAdmin, updatePurchase)
    .delete('/:purchaseNum', checkAdmin, deletePurchase)

module.exports = router