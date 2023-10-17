const Customer = require("../models/customer.model");

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll(req.query)
        if (customers) {
            return res.status(200).json(customers)
        } else {
            return res.status(404).send("No customers found!")
        }
} catch (error) {
    return res.status(500).json({ error: error.message })
}
};

const getOneCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.customerId)
        if (customer) {
            return res.status(200).json(customer)
        } else {
            return res.status(404).send("Customer not found!")
        }
} catch (error) {
    return res.status(500).json({ error: error.message })
    }
};

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            address: req.body.address,
            zipCode: req.body.zipCode,
        })
        return res.status(200).json({ message: 'Customer created', customer: customer })
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.update(req.body, {
            returning: true,
            where: {
                id: req.params.customerId,
            },
        })
        if (customer !== 0) {
            return res.status(200).json({ message: 'Customer updated'})
        } else {
            return res.status(404).send('Customer not found')
        }
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.destroy({
            where: {
                id: req.params.customerId
            }
        })
    
        if (!customer){
            return res.status(404).send('Customer not found')
        }else{
            return res.status(200).json({ message: 'Customer deleted' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
        }
    }

module.exports = {
    getAllCustomers,
    getOneCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
}