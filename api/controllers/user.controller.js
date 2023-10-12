const User = require('../models/user.model')
const Contact = require('../models/contactInfo.model') 

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(req.query)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createUser = async (req, res) => {
    try {
/*         const existingUser = await User.findOne({ where: req.body.email })

        if(existingUser){
            return res.status('409').send('User already exists')
        } */

        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            role: req.body.role,
        })

        const contact = await Contact.create({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            phone: req.body.phone,
            zipCode: req.body.zipCode
        })

        await user.setContactInfo(contact)

        return res.status(200).json({ message: 'User created', user: user, contact: contact })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const [user] = await User.update(req.body, {
            where: {
                id: req.params.userId
            }
        })
    
        if (!user){
            return res.status(404).send('User not found')
        }
        return res.status(200).json({ message: 'User updated' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.userId
            }
        })

        if (!user){
            return res.status(404).send('User not found')
        }

        return res.status(200).json({ message: 'User deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}