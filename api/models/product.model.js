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
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isFloat: true,
                len: [4, Infinity]
            }
        }
    },
    {
        timestamps: false
    }
)

module.exports = Product