const router = require('express').Router()

const { 
    getAllCategories, 
    getOneCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/category.controller')

const { checkOwner } = require("../../middlewares")

router
    .get('/', getAllCategories)
    .get('/:categoryId', getOneCategory)
    .post('/', checkOwner, createCategory)
    .put('/:categoryId', checkOwner, updateCategory)
    .delete('/:categoryId', checkOwner, deleteCategory)

module.exports = router