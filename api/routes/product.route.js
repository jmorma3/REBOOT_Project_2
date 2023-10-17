const router = require('express').Router()

const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

router
    .get('/', getAllProducts)
    .get('/:productId', getOneProduct)
    .post('/', createProduct)
    .put('/:productId', updateProduct)
    .delete('/:productId', deleteProduct)

module.exports = router