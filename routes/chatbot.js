const router = require('express').Router()
const {
	getChatbotById,
	updateChatbotById,
	deleteChatbotById
} = require('../controllers/chatbot')

// Chatbot Routes
router
	.route('/:chatbotId')
	.get(getChatbotById)
	.put(updateChatbotById)
	.delete(deleteChatbotById)

module.exports = router
