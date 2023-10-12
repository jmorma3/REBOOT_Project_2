const router = require('express').Router()

const { getAllPurchases, getOnePurchase, createPurchase, updatePurchase, deletePurchase } = require('../controllers/purchase.controller')


router.get('/', getAllPurchases)
router.get('/:purchaseNum', getOnePurchase)
router.post('/', createPurchase)
router.put('/:purchaseNum', updatePurchase)
router.delete('/:purchaseNum', deletePurchase)

module.exports = router