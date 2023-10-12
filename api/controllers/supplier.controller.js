const Supplier = require('../models/supplier.model')

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
        const existingSupplier = await Supplier.findOne({ where: req.body.name })

        if(existingSupplier){
            return res.status('409').send('Supplier already exists')
        }

        const supplier = await Supplier.create({
            name: req.body.name
        })

        return res.status(200).json({ message: 'Supplier created', supplier: supplier })
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