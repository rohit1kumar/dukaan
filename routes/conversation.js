const router = require('express').Router()
const {
	getConversationById,
	updateConversationById,
	deleteConversationById
} = require('../controllers/conversation')
const { validateUpdateConversation } = require('../middlewares/validator')
// Conversation Routes
router
	.route('/:conversationId')
	.get(getConversationById)
	.put(validateUpdateConversation, updateConversationById)
	.delete(deleteConversationById)

module.exports = router
