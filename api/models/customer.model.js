const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Customer = connection.define(
    "customer",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        phone:{
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        address:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        zipCode:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)
    module.exports = Customer