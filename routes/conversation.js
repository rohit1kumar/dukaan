const router = require('express').Router()
const {
	getConversationById,
	updateConversationById,
	deleteConversationById
} = require('../controllers/conversation')

// Conversation Routes
router
	.route('/:conversationId')
	.get(getConversationById)
	.put(updateConversationById)
	.delete(deleteConversationById)

module.exports = router
