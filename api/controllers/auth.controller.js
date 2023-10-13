const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const ContactInfo = require('../models/contactInfo.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const signUp = async (req, res) => {
    try {
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'Password too short' })
        }
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
        const encrypted = bcrypt.hashSync(req.body.password, salt)
        req.body.password = encrypted
        const contactInfo = await ContactInfo.create(req.body)
        const user = await User.create(req.body)
        await user.setContactInfo(contactInfo)
        const token = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '1h' }) 
        return res.status(200).json({
            message: 'User created',
            token: token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { signUp }