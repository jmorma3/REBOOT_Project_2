const router = require('express').Router()

const { 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    getOwnProfile,
    updateOwnProfile,
    deleteOwnProfile,
    updateOwnPassword
} = require('../controllers/user.controller')

const { checkAdmin } = require("../../middlewares")

router
    .get('/', checkAdmin, getAllUsers)
    .get('/profile', getOwnProfile)
    .get('/:userId', checkAdmin, getOneUser)
    .post('/', checkAdmin, createUser)
    .put('/profile', updateOwnProfile)
    .put('/password', updateOwnPassword)
    .put('/:userId', checkAdmin, updateUser)
    .delete('/profile', deleteOwnProfile)
    .delete('/:userId', checkAdmin, deleteUser)

module.exports = router