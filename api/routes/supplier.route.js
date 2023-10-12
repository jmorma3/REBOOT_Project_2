const router = require('express').Router()

const { 
    getAllSuppliers, 
    getOneSupplier, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} = require('../controllers/supplier.controller')


router
    .get('/', getAllSuppliers)
    .get('/:supplierId', getOneSupplier)
    .post('/', createSupplier)
    .put('/:supplierId', updateSupplier)
    .delete('/:supplierId', deleteSupplier)

module.exports = router