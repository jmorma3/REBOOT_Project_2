const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Category = connection.define(
    "category",
    {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryDescription: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = Category