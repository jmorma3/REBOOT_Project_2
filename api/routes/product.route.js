const router = require('express').Router()

const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

const { checkOwner } = require("../../middlewares")

router.get('/', getAllProducts)
router.get('/:productId', getOneProduct)
router.post('/',checkOwner, createProduct)
router.put('/:productId', checkOwner,updateProduct)
router.delete('/:productId', checkOwner,deleteProduct)

module.exports = router