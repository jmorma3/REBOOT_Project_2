const { DataTypes } = require('sequelize')
const { connection } = require('../../database')

const Product = connection.define(
    'product', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
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