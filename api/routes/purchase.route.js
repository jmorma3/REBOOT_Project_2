const router = require('express').Router()

const { getAllPurchases, getOnePurchase, createPurchase, updatePurchase, deletePurchase } = require('../controllers/purchase.controller')

const { checkOwner, checkAdmin } = require("../../middlewares")

router.get('/', checkAdmin, getAllPurchases)
router.get('/:purchaseNum', checkOwner, getOnePurchase)
router.post('/', checkOwner, createPurchase)
router.put('/:purchaseNum', checkAdmin, updatePurchase)
router.delete('/:purchaseNum', checkAdmin, deletePurchase)

module.exports = router