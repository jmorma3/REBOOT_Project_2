const router = require('express').Router()

const { signUp, logIn } = require('../controllers/auth.controller')

router 
    .post('/signup', signUp)
    .post('/login', logIn )

module.exports = router    