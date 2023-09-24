const router = require('express').Router()

const userRoutes = require('./user')
const chatbotRoutes = require('./chatbot')
const endUserRoutes = require('./endUser')
const conversationRoutes = require('./conversation')

router.use('/users', userRoutes)
router.use('/chatbots', chatbotRoutes)
router.use('/endusers', endUserRoutes)
router.use('/conversations', conversationRoutes)

module.exports = router
