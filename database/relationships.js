const User = require("../api/models/user.model")
const Supplier = require("../api/models/supplier.model")
const Shop = require("../api/models/shop.model")
const Sale = require("../api/models/sale.model")
const Purchase = require("../api/models/purchase.model")
const Product = require("../api/models/product.model")
const ContactInfo = require("../api/models/contactInfo.model")
const Category = require("../api/models/category.model")
const Customer = require("../api/models/customer.model")


const addRelationshipsToModels = () => {
    try {
        //One to One:
        ContactInfo.hasOne(User)
        User.belongsTo(ContactInfo)

        ContactInfo.hasOne(Supplier)
        Supplier.belongsTo(ContactInfo)

        User.hasOne(Shop)
        Shop.belongsTo(User)

        //One to Many:
        Category.hasMany(Product)
        Product.belongsTo(Category)

        Supplier.hasMany(Product)
        Product.belongsTo(Supplier)

        Shop.hasMany(Product)
        Product.belongsTo(Shop)

        Shop.hasMany(Purchase)
        Purchase.belongsTo(Shop)
    
        Supplier.hasMany(Purchase)
        Purchase.belongsTo(Supplier)
    
        Product.hasMany(Purchase)
        Purchase.belongsTo(Product)

        Shop.hasMany(Sale)
        Sale.belongsTo(Shop)

        Product.hasMany(Sale)
        Sale.belongsTo(Product)

        //Pendiente de crear nuevo modelo "Customer":
        Customer.hasMany(Sale)
        Sale.belongsTo(Customer)

        //Many to Many:
        Purchase.belongsToMany(Product, {through: "Purchase_Products"})
        Product.belongsToMany(Purchase, {through: "Purchase_Products"})
        
        console.log('Relationships added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelationshipsToModels