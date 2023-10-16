const router = require('express').Router()

const { getAllContactInfos, getOneContactInfo, createContactInfo, updateContactInfo, deleteContactInfo } = require('../controllers/contactInfo.controller')

router
    .get('/', getAllContactInfos)
    .get('/:contactInfoId', getOneContactInfo)
    .post('/', createContactInfo)
    .put('/:contactInfoId', updateContactInfo)
    .delete('/:contactInfoId', deleteContactInfo)

module.exports = router