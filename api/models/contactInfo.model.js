const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const ContactInfo = connection.define(
    "contactInfo",
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
            allowNull: false, 
            unique: true, 
            validate:{
                len: [9]  //Ojo, posible error
            }
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

module.exports = ContactInfo