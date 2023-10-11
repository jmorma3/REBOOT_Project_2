const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Shop = connection.define(
    "shop",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category:{
            type: DataTypes.ENUM("category1", "category2", "category3"),
            defaultValue: "category1", 
            allowNull: false, 
        }

    },
    {
        timestamps: false
    })

module.exports = Shop