const router = require('express').Router()
const {
	getChatbotById,
	updateChatbotById,
	deleteChatbotById
} = require('../controllers/chatbot')

const {
	createConversation,
	getConversations
} = require('../controllers/conversation')

// Chatbot Routes
router
	.route('/:chatbotId')
	.get(getChatbotById)
	.put(updateChatbotById)
	.delete(deleteChatbotById)

// Conversation Routes for a chatbot
router
	.route('/:chatbotId/conversations')
	.post(createConversation)
	.get(getConversations)

module.exports = router
