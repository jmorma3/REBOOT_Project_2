const router = require('express').Router()

const { getAllShops, getOneShop, getOwnShopInfo, createShop, updateShop, deleteShop, createShopToUser } = require('../controllers/shop.controller')

const { checkAdmin, checkOwner } = require("../../middlewares")

router.get('/', checkAdmin,  getAllShops)
router.get('/profile', getOwnShopInfo)
router.get('/:shopId',  checkOwner, getOneShop)
router.post('/', checkOwner, createShop)
router.post('/:userId', checkAdmin, createShopToUser)
router.put('/:shopId', checkOwner, updateShop)
router.delete('/:shopId', checkOwner, deleteShop)

module.exports = router