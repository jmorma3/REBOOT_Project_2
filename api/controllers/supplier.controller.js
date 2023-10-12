const Supplier = require('../models/supplier.model')
const Contact = require('../models/contactInfo.model')

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll(req.query)
        return res.status(200).json(suppliers)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.supplierId)
        if (!supplier) {
            return res.status(404).send('Supplier not found')
        }
        return res.status(200).json(supplier)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create({
            supplierName: req.body.supplierName
        })

        const contact = await Contact.create({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            phone: req.body.phone,
            zipCode: req.body.zipCode
        })

        await supplier.setContactInfo(contact)

        return res.status(200).json({ message: 'Supplier created', supplier: supplier, contact: contact })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateSupplier = async (req, res) => {
    try {
        const [supplier] = await Supplier.update(req.body, {
            where: {
                id: req.params.supplierId
            }
        })
    
        if (!supplier){
            return res.status(404).send('Supplier not found')
        }
        return res.status(200).json({ message: 'Supplier updated' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.destroy({
            where: {
                id: req.params.supplierId
            }
        })

        if (!supplier){
            return res.status(404).send('Supplier not found')
        }

        return res.status(200).json({ message: 'Supplier deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllSuppliers,
    getOneSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
}