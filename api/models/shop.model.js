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
            type: DataTypes.ENUM("Alimentos y Comestibles", "Frutas y Verduras Frescas", "Carnes y Embutidos","Pescados y Mariscos Frescos", "Panadería y Repostería" ),
            defaultValue: "Alimentos y Comestibles", 
            allowNull: false, 
        }

    },
    {
        timestamps: false
    })

module.exports = Shop