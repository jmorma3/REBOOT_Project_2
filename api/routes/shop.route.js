const router = require('express').Router()

const { getAllShops, getOneShop, getOwnShopInfo, createShop, updateShop, deleteShop, createShopToUser, getOwnPurchaseHistory, updateOwnShop, deleteOwnShop } = require('../controllers/shop.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllShops)
    .get('/profile', getOwnShopInfo)
    .get('/purchaseHistory', getOwnPurchaseHistory)
    .get('/:shopId', getOneShop)
    .post('/', createShop)
    .post('/:userId', checkAdmin, createShopToUser)
    .put('/profile', updateOwnShop)
    .put('/:shopId', updateShop)
    .delete('/profile', deleteOwnShop)
    .delete('/:shopId', deleteShop)



module.exports = router