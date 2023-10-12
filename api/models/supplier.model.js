const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const Supplier = connection.define(
    'supplier',
    {
        supplierName: {
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