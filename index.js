require('dotenv').config()
const { checkConnection, syncModels } = require('./database')
const addRelationshipsToModels = require('./database/relationships')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const checkAndSyncPostgreSQL = async () => {
    await checkConnection()
    addRelationshipsToModels()
    await syncModels('alter')
}

const initAndListenWithExpress = () => {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('./api/routes'))

        .listen(process.env.PORT, () => {
            console.log(`> Listening on port: ${process.env.PORT}`)
        })
}

const startAPI = async () => {
    await checkAndSyncPostgreSQL()
    initAndListenWithExpress()
}

startAPI()