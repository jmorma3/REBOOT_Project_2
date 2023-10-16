const router = require('express').Router()

const { getAllShops, getOneShop, getOwnShopInfo, createShop, updateShop, deleteShop, createShopToUser, getOwnPurchaseHistory, updateOwnShop, deleteOwnShop } = require('../controllers/shop.controller')

const { checkAdmin } = require("../../middlewares")

router.get('/', checkAdmin, getAllShops)
router.get('/profile', getOwnShopInfo)
router.get('/purchaseHistory', getOwnPurchaseHistory)
router.get('/:shopId', getOneShop)
router.post('/', createShop)
router.post('/:userId', checkAdmin, createShopToUser)
router.put('/profile', updateOwnShop)
router.put('/:shopId', updateShop)
router.delete('/profile', deleteOwnShop)
router.delete('/:shopId', deleteShop)



module.exports = router