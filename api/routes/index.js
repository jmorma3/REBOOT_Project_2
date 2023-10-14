const router = require('express').Router()
const userRouter = require('./user.route')
const productRouter = require('./product.route')
const categoryRouter = require('./category.route')
const supplierRouter = require('./supplier.route')
const shopRouter = require('./shop.route')
const contactInfoRouter = require('./contactInfo.route')
const saleRouter = require('./sale.route')
const purchaseRouter = require('./purchase.route')
const customerRouter = require('./customer.route')
const authRouter = require('./auth.route')
const { checkAuth, checkAdmin } = require("../../middlewares")

router.use('/user', checkAuth,  userRouter)
router.use('/product', checkAuth, productRouter)
router.use('/category', checkAuth, categoryRouter)
router.use('/supplier', checkAuth, supplierRouter)
router.use('/shop', checkAuth, shopRouter)
router.use('/contactInfo', checkAuth, checkAdmin, contactInfoRouter)
router.use('/sale', checkAuth, saleRouter)
router.use('/purchase', checkAuth, purchaseRouter)
router.use('/customer', checkAuth, customerRouter)
router.use('/auth', authRouter)



module.exports = router