const router = require('express').Router()

const userRoutes = require('./user')
const chatbotRoutes = require('./chatbot')
router.use('/users', userRoutes)
router.use('/chatbots', chatbotRoutes)

module.exports = router
