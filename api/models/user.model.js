const { DataTypes } = require("sequelize")
const { connection } = require("../../database")

const User = connection.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        email:{
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true //Pending
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        role:{
            type: DataTypes.ENUM("owner", "admin"), 
            defaultValue: "owner", 
            allowNull: false  
        }

    }, 
    {
        timestamps: false
    }
)

module.exports = User