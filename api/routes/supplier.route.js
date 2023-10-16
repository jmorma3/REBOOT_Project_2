const router = require('express').Router()

const { 
    getAllSuppliers, 
    getOneSupplier, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} = require('../controllers/supplier.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', getAllSuppliers)
    .get('/:supplierId',  getOneSupplier)
    .post('/', checkAdmin, createSupplier)
    .put('/:supplierId', checkAdmin, updateSupplier)
    .delete('/:supplierId', checkAdmin, deleteSupplier)

module.exports = router