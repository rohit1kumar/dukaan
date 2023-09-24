const router = require('express').Router()

const userRoutes = require('./user')
const chatbotRoutes = require('./chatbot')
const endUserRoutes = require('./endUser')

router.use('/users', userRoutes)
router.use('/chatbots', chatbotRoutes)
router.use('/endusers', endUserRoutes)

module.exports = router
