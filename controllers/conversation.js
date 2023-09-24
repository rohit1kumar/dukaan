const { Chatbot, Conversation } = require('../models')
const { findAllWithPagination } = require('../utils/pagination')

/* Create a new conversation with a chatbot
 * POST /chatbots/:chatbotId/conversation
 * */
exports.createConversation = async (req, res) => {
	try {
		const { chatbotId } = req.params
		// TODO: use endUserId from req.user instead of req.body once authentication is implemented
		const { endUserId } = req.body

		// check if chatbot exists
		const chatbot = await Chatbot.findByPk(chatbotId)
		if (!chatbot) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Chatbot not found with the provided id'
			})
		}

		const conversation = await Conversation.create({
			status: 'ongoing',
			chatbotId,
			endUserId
		})

		res.status(201).json({
			status: 'ok',
			message: 'Conversation Created Successfully',
			data: conversation
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get all conversations for a chatbot
 * GET /chatbots/:chatbotId/conversations
 * */
exports.getConversations = async (req, res) => {
	try {
		const { limit, page } = req.query
		const { chatbotId } = req.params

		// check if chatbot exists
		const chatbot = await Chatbot.findByPk(chatbotId)
		if (!chatbot) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Chatbot not found with the provided id'
			})
		}

		const conversations = await findAllWithPagination(
			Conversation,
			{ chatbotId },
			limit,
			page
		)

		res.status(200).json({
			status: 'ok',
			message: 'Conversations Fetched Successfully',
			...conversations
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get a conversation by id
 * GET /conversations/:conversationId
 * */
exports.getConversationById = async (req, res) => {
	try {
		const { conversationId } = req.params

		const conversation = await Conversation.findByPk(conversationId)

		if (!conversation) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Conversation not found with the provided id'
			})
		}

		res.status(200).json({
			status: 'ok',
			message: 'Conversation Fetched Successfully',
			data: conversation
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Update a conversation by id
 * PUT /conversations/:conversationId
 * */
exports.updateConversationById = async (req, res) => {
	try {
		const { conversationId } = req.params
		const { status } = req.body
		const validStatuses = ['ongoing', 'completed', 'suspended']

		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				status: 'error',
				message: 'Bad Request',
				error: 'Status must be one of: ongoing, completed or suspended'
			})
		}

		const conversation = await Conversation.findByPk(conversationId)

		if (!conversation) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Conversation not found with the provided id'
			})
		}
		const updatedConversation = await conversation.update({ status })

		res.status(200).json({
			status: 'ok',
			message: 'Conversation Updated Successfully',
			data: updatedConversation
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Delete a conversation by id
 * DELETE /conversations/:conversationId
 * */
exports.deleteConversationById = async (req, res) => {
	try {
		const { conversationId } = req.params

		const conversation = await Conversation.findByPk(conversationId)

		if (!conversation) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Conversation not found with the provided id'
			})
		}

		await conversation.destroy()

		res.status(200).json({
			status: 'ok',
			message: 'Conversation Deleted Successfully',
			data: conversation
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}
