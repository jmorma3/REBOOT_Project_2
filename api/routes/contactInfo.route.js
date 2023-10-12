const router = require('express').Router()

const { getAllContactInfos, getOneContactInfo, createContactInfo, updateContactInfo, deleteContactInfo } = require('../controllers/contactInfo.controller')


router.get('/', getAllContactInfos)
router.get('/:contactInfoId', getOneContactInfo)
router.post('/', createContactInfo)
router.put('/:contactInfoId', updateContactInfo)
router.delete('/:contactInfoId', deleteContactInfo)

module.exports = router