const router = require('express').Router();
const {getOneCustomer, getAllCustomers, createCustomer, updateCustomer, deleteCustomer} = require('../controllers/customer.controller');

//Rutas para clientes

router.get('/', getAllCustomers);
router.get('/:customerId', getOneCustomer);
router.post('/', createCustomer);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

module.exports = router;