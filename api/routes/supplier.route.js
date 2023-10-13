const router = require('express').Router()

const { 
    getAllSuppliers, 
    getOneSupplier, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} = require('../controllers/supplier.controller')

const { checkAdmin, checkOwner } = require("../../middlewares")

router
    .get('/', checkOwner, getAllSuppliers)
    .get('/:supplierId', checkOwner,  getOneSupplier)
    .post('/', checkAdmin, createSupplier)
    .put('/:supplierId', checkAdmin, updateSupplier)
    .delete('/:supplierId', checkAdmin, deleteSupplier)

module.exports = router