const router = require('express').Router()

const { 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllUsers)
    .get('/:userId', checkAdmin, getOneUser)
    //Crear ruta para getProfile
    .post('/', checkAdmin, createUser)
    .put('/:userId', checkAdmin, updateUser)
    //Crear ruta para updateProfile
    //Crear ruta para updatePassword
    .delete('/:userId', checkAdmin, deleteUser)
    //Crear ruta para deleteProfile

module.exports = router