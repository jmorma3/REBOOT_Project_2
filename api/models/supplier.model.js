const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Supplier = connection.define(
    'supplier',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false
    }
)

module.exports = Supplier