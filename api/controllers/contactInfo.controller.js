const ContactInfo = require("../models/contactInfo.model")
const User = require("../models/user.model")

const getAllContactInfos = async (req, res) => {
    try {
        const contactInfos = await ContactInfo.findAll(req.query)
        if (contactInfos) {
            return res.status(200).json(contactInfos)
        } else {
            return res.status(404).send("No contact info found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getOneContactInfo = async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findByPk(req.params.contactInfoId)
        if (contactInfo) {
            return res.status(200).json(contactInfo)
        } else {
            return res.status(404).send("Contact info not found!")
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createContactInfo = async (req, res) => {
    try {
        const { name, surname, phone, address, zipCode, userId } = req.body
        const contact = await ContactInfo.create({
            name: name,
            surname: surname,
            phone: phone,
            address: address,
            zipCode: zipCode,
            userId: userId
        })

        if (userId) {
            const user = await User.findByPk(userId)

            if (user) user.setContactInfo(contact)
        }
        
        return res.status(200).json({ message: 'Contact info created', contactInfo: contact })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateContactInfo = async (req, res) => {
    try {
        const contactInfo = await ContactInfo.update(req.body, {
            returning: true,
            where: {
                id: req.params.contactInfoId,
            },
        })
        if (contactInfo !== 0) {
            return res.status(200).json({ message: 'Contact info updated' })
        } else {
            return res.status(404).send('Contact info not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteContactInfo = async (req, res) => {
    try {
        const contactInfo = await ContactInfo.destroy({
            where: {
                id: req.params.contactInfoId,
            },
        })
        if (contactInfo) {
            return res.status(200).json('Contact info deleted')
        } else {
            return res.status(404).send('Contact info not found')
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllContactInfos,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo
}

