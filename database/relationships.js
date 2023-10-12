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
        User.belongsToMany(Product, { through: Sale, as: 'userSale' })
        Product.belongsToMany(User, { through: Sale, as: 'productUserSale' })
        Shop.belongsToMany(Product, { through: Sale, as: 'shopSale' })
        Product.belongsToMany(Shop, { through: Sale, as: 'productShopSale' })

        Sale.belongsTo(User, { foreignKey: 'userId' })

        Shop.belongsToMany(Product, { through: Purchase, as: 'shopPurchase' })
        Product.belongsToMany(Shop, { through: Purchase, as: 'productShopPurchase' })
        Supplier.belongsToMany(Product, { through: Purchase, as: 'supplierPurchase' })
        Product.belongsToMany(Supplier, { through: Purchase, as: 'productSupplierPurchase' })

        Purchase.belongsTo(Shop, { foreignKey: 'shopId' })

        console.log('Relationships added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelationshipsToModels