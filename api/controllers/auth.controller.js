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

const logIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
             email: req.body.email   
            }
        })
        if(!user) return res.status(404).send('Error: Email or Password incorrect')
        const comparePass = bcrypt.compareSync(req.body.password, user.password)
        if(comparePass) {
            const payload = { email: user.email, userName: user.userName }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h'})
            return res.status(404).json({ token})
        } else {
            return res.status(404).json('Error: Email or Password incorrect')
        }
        } catch (error) {
            return res.status(500).send(error.message)
         }
}

module.exports = { signUp, logIn }
