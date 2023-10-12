const router = require('express').Router()

const { 
    getAllCategories, 
    getOneCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/category.controller')


router
    .get('/', getAllCategories)
    .get('/:categoryId', getOneCategory)
    .post('/', createCategory)
    .put('/:categoryId', updateCategory)
    .delete('/:categoryId', deleteCategory)

module.exports = router