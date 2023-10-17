const router = require('express').Router();
const {getOneCustomer, getAllCustomers, createCustomer, updateCustomer, deleteCustomer} = require('../controllers/customer.controller');

//Rutas para clientes

router
    .get('/', getAllCustomers)
    .get('/:customerId', getOneCustomer)
    .post('/', createCustomer)
    .put('/:customerId', updateCustomer)
    .delete('/:customerId', deleteCustomer)

module.exports = router;