const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const shopProduct = connection.define(
    "shopProduct",
    {
        quantityAvailable: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false
    })

module.exports = shopProduct