const router = require('express').Router()

const { getAllShops, getOneShop, createShop, updateShop, deleteShop } = require('../controllers/shop.controller')

router.get('/', getAllShops)
router.get('/:shopId', getOneShop)
router.post('/', createShop)
router.put('/:shopId', updateShop)
router.delete('/:shopId', deleteShop)

module.exports = router