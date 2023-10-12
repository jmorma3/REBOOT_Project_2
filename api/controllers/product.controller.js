const Product = require("../models/product.model")
const Category = require("../models/category.model")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll(req.query)
        if (products) {
            return res.status(200).json(products)
        } else {
            return res.status(404).send("No products found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId)
        if (product) {
            return res.status(200).json(product)
        } else {
            return res.status(404).send("Product not found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            price: req.body.price
        })
        const category = await Category.create({
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription
        })

        await category.addProduct(product)

        return res.status(200).json({ message: 'Product created', product: product, category: category })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.update(req.body, {
            returning: true,
            where: {
                id: req.params.productId,
            },
        })
        if (product !== 0) {
            return res.status(200).json({ message: 'Product updated', product: product })
        } else {
            return res.status(404).send('Product not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({
            where: {
                id: req.params.productId,
            },
        })
        if (product) {
            return res.status(200).json('Product deleted')
        } else {
            return res.status(404).send('Product not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}

