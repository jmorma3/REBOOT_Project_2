const router = require('express').Router()

const { getAllPurchases, getOnePurchase, createPurchase, updatePurchase, deletePurchase } = require('../controllers/purchase.controller')

const { checkAdmin } = require("../../middlewares")

router.get('/', checkAdmin, getAllPurchases)
router.get('/:purchaseNum', checkAdmin, getOnePurchase)
//router.get('/profile', )
router.post('/', createPurchase) //accessPurchase - Pending
router.put('/:purchaseNum', checkAdmin, updatePurchase)
router.delete('/:purchaseNum', checkAdmin, deletePurchase)

module.exports = router