const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Purchase = connection.define(
    "purchase",
    {
        purchase_num: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [10] // Add validate regex later
            }
        },
        purchase_payment_method: {
            type: DataTypes.ENUM('cash', 'credit_card', 'paypal', 'transfer'),
            allowNull: false
        },
        purchaseProductQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        purchaseTotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                isFloat: true // reduce to decimal
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: function () {
                return new Date()
            }
		},
    },
    {
        updatedAt: false
    }
)

module.exports = Purchase