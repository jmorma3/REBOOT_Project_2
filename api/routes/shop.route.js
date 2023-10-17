const router = require('express').Router()

const { getAllShops, getOneShop, getOwnShopInfo, createShop, updateShop, deleteShop, createShopToUser, addShopToUser, getOwnPurchaseHistory, updateOwnShop, deleteOwnShop } = require('../controllers/shop.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllShops)
    .get('/profile', getOwnShopInfo)
    .get('/purchaseHistory', getOwnPurchaseHistory)
    .get('/:shopId', checkAdmin, getOneShop)
    .post('/', checkAdmin, createShop)
    .post('/addShopToUser/:userId', checkAdmin, addShopToUser)
    .post('/:userId', checkAdmin, createShopToUser)
    .put('/profile', updateOwnShop)
    .put('/:shopId', checkAdmin, updateShop)
    .delete('/profile', deleteOwnShop)
    .delete('/:shopId', checkAdmin, deleteShop)



module.exports = router