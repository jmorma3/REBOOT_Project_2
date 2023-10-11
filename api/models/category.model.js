const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Category = connection.define(
    "category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

module.exports = Category