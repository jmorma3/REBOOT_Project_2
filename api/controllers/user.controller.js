const User = require('../models/user.model')
const Contact = require('../models/contactInfo.model') 
const bcrypt = require('bcrypt')
require('dotenv').config()

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

const getOwnProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: res.locals.user.id
            },
            attributes: ['username', 'email'],
            include: {
                model: Contact,
                attributes: ['name', 'surname', 'address', 'phone', 'zipCode']
            }
        })

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createUser = async (req, res) => {
    try {
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

const updateOwnPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password too short' });
        }

        // Generar un nuevo hash de contraseña con un nuevo salt
        const saltRounds = parseInt(process.env.SALTROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        // Actualizar la contraseña del usuario
        const userId = res.locals.user.id;
        const updatedUser = await User.update({ 
                password: hashedPassword 
            },{
                where: { 
                    id: userId 
                }
            }
        );

        if (updatedUser[0] === 1) {
            return res.status(200).json({ message: 'Password changed' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
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

const updateOwnProfile = async (req, res) => {
    try {

        if (req.body.password) {
            return res.status(409).send('Youuuuuu shaaaaaall not chaaaaaaange yooour paaaaaaaaassword! 🧙‍♂️')
        } 

        await User.update(req.body, {
            where: {
                id: res.locals.user.id
            }
        })

        await Contact.update(req.body, {
            where: {
                id: res.locals.user.contactInfoId
            }
        })
      
        return res.status(200).json({ message: 'Profile updated'})
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

const deleteOwnProfile = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: res.locals.user.id
            }
        })

        await Contact.destroy({
            where:{
                id: res.locals.user.contactInfoId
            }
        })

        return res.status(200).json({ message: 'Profile deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOwnProfile,
    createUser,
    updateUser,
    updateOwnProfile,
    updateOwnPassword,
    deleteUser,
    deleteOwnProfile
}