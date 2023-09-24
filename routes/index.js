const router = require('express').Router()

const authRoutes = require('./auth')
const userRoutes = require('./user')
const chatbotRoutes = require('./chatbot')
const endUserRoutes = require('./endUser')
const conversationRoutes = require('./conversation')

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/chatbots', chatbotRoutes)
router.use('/endusers', endUserRoutes)
router.use('/conversations', conversationRoutes)

module.exports = router
