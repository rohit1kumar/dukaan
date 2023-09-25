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

const {
	validateUpdateChatbot,
	validateCreateConversation
} = require('../middlewares/validator')

// Chatbot Routes
router
	.route('/:chatbotId')
	.get(getChatbotById)
	.put(validateUpdateChatbot, updateChatbotById)
	.delete(deleteChatbotById)

// Conversation Routes for a chatbot
router
	.route('/:chatbotId/conversations')
	.post(validateCreateConversation, createConversation)
	.get(getConversations)

module.exports = router
