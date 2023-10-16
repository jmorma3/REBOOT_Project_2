const router = require('express').Router()

const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/', getAllProducts)
router.get('/:productId', getOneProduct)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router