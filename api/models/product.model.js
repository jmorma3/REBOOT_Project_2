const { DataTypes } = require('sequelize')
const { connection } = require('../../database')

const Product = connection.define(
    'product', 
    {
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = Product