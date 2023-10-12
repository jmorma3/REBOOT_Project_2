const ContactInfo = require("../models/contactInfo.model")

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
        const contactInfo = await ContactInfo.create({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            address: req.body.address,
            zipCode: req.body.zipCode
        })
        return res.status(200).json({ message: 'Contact info created', contactInfo: contactInfo })
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
            return res.status(200).json({ message: 'Contact info updated', contactInfo: contactInfo })
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

