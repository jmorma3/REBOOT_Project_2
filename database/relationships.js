const User = require("../api/models/user.model")
const Supplier = require("../api/models/supplier.model")
const Shop = require("../api/models/shop.model")
const Sale = require("../api/models/sale.model")
const Purchase = require("../api/models/purchase.model")
const Product = require("../api/models/product.model")
const ContactInfo = require("../api/models/contactInfo.model")
const Category = require("../api/models/category.model")


const addRelationshipsToModels = () => {
    try {
        //One to One:
        User.hasOne(ContactInfo)
        ContactInfo.belongsTo(User)

        Supplier.hasOne(ContactInfo)
        ContactInfo.belongsTo(Supplier)

        //One to Many:
        User.hasMany(Shop)
        Shop.belongsTo(User)

        Category.hasMany(Product)
        Product.belongsTo(Category)

        //Many to Many:
        User.belongsToMany(Shop, {through: Purchase})
        Shop.belongsToMany(User, {through: Purchase})
        User.belongsToMany(Product, {through: Purchase})
        Product.belongsToMany(User, {through: Purchase})
        Shop.belongsToMany(Product, {through: Purchase})
        Product.belongsToMany(Shop,{through: Purchase})

        User.belongsToMany(Supplier, {through: Sale})
        Supplier.belongsToMany(User, {through: Sale})
        User.belongsToMany(Product, {through: Sale})
        Product.belongsToMany(User, {through: Sale})
        Supplier.belongsToMany(Product, {through: Sale})
        Product.belongsToMany(Supplier,{through: Sale})

        console.log('Relationships added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelationshipsToModels