const { Sequelize } = require('sequelize')
require('dotenv').config()

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
})

const checkConnection = async () => {
    try {
        await connection.authenticate()
        console.log(`Connection to ${process.env.DB_NAME} successfully`)
    } catch (error) {
        throw error
    }
}

const syncModels = async (value) => {
    const state = {
        alter: { alter: true },
        force: { force: true }
    }

    try {
        await connection.sync(state[value] || '')
        console.log('All models were synchronized successfully')
    } catch (error) {
        throw error
    }
}

module.exports = { connection, checkConnection, syncModels }