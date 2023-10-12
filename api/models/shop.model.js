const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Shop = connection.define(
    "shop",
    {
        shopName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shopCategory:{
            type: DataTypes.ENUM("category1", "category2", "category3"),
            defaultValue: "category1", 
            allowNull: false, 
        }

    },
    {
        timestamps: false
    })

module.exports = Shop