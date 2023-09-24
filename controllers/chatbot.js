const { Chatbot, User } = require('../models')

/* Create a new chatbot for a user
 * POST /users/:userId/chatbots
 * */
exports.createChatbot = async (req, res) => {
	try {
		const { userId } = req.params
		const { name, description } = req.body
		// check if user exists
		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'User not found with the provided id'
			})
		}

		const chatbot = await Chatbot.create({
			name,
			description,
			userId
		})

		res.status(201).json({
			status: 'ok',
			message: 'Chatbot Created Successfully',
			data: chatbot
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get all chatbots of a user by userId
 * GET /users/:userId/chatbots
 * */
exports.getAllChatbots = async (req, res) => {
	try {
		const { userId } = req.params
		// check if user exists
		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'User not found with the provided id'
			})
		}

		const chatbots = await Chatbot.findAll({
			where: {
				userId
			}
		})

		res.status(200).json({
			status: 'ok',
			message: 'Chatbots Fetched Successfully',
			data: chatbots
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get a chatbot by chatbotId
 * GET /chatbots/:chatbotId
 * */
exports.getChatbotById = async (req, res) => {
	try {
		const { chatbotId } = req.params
		const chatbot = await Chatbot.findByPk(chatbotId)
		if (!chatbot) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Chatbot not found with the provided id'
			})
		}

		res.status(200).json({
			status: 'ok',
			message: 'Chatbot Fetched Successfully',
			data: chatbot
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Update a chatbot by chatbotId
 * PUT /chatbots/:chatbotId
 *  */
exports.updateChatbotById = async (req, res) => {
	try {
		const { chatbotId } = req.params
		const { name, description } = req.body
		const chatbot = await Chatbot.findByPk(chatbotId)
		if (!chatbot) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Chatbot not found with the provided id'
			})
		}

		// TODO: check if user is authorized to update the chatbot

		const updatedChatbot = await chatbot.update({ name, description })

		res.status(200).json({
			status: 'ok',
			message: 'Chatbot Updated Successfully',
			data: updatedChatbot
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Delete a chatbot by chatbotId
 * DELETE /chatbots/:chatbotId
 *  */
exports.deleteChatbotById = async (req, res) => {
	try {
		const { chatbotId } = req.params
		const chatbot = await Chatbot.findByPk(chatbotId)
		if (!chatbot) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'Chatbot not found with the provided id'
			})
		}

		await chatbot.destroy()

		res.status(200).json({
			status: 'ok',
			message: 'Chatbot Deleted Successfully',
			data: null
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}
