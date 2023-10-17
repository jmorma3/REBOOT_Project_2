const Category = require('../models/category.model')

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll(req.query)
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId)
        if (!category) {
            return res.status(404).send('Category not found')
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription
        })

        return res.status(200).json({ message: 'Category created', category: category })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const [category] = await Category.update(req.body, {
            where: {
                id: req.params.categoryId
            }
        })
    
        if (!category){
            return res.status(404).send('Category not found')
        }
        return res.status(200).json({ message: 'Category updated' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.destroy({
            where: {
                id: req.params.categoryId
            }
        })

        if (!category){
            return res.status(404).send('Category not found')
        }

        return res.status(200).json({ message: 'Category deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}