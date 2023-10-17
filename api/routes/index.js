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

router
    .use('/user', checkAuth,  userRouter)
    .use('/product', checkAuth, productRouter)
    .use('/category', checkAuth, categoryRouter)
    .use('/supplier', checkAuth, supplierRouter)
    .use('/shop', checkAuth, shopRouter)
    .use('/contactInfo', checkAuth, checkAdmin, contactInfoRouter)
    .use('/sale', checkAuth, saleRouter)
    .use('/purchase', checkAuth, purchaseRouter)
    .use('/customer', checkAuth, customerRouter)
    .use('/auth', authRouter)



module.exports = router