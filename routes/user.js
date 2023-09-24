const router = require('express').Router()
const {
	createUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
} = require('../controllers/user')
const { createChatbot, getAllChatbots } = require('../controllers/chatbot')

// User Routes
router
	.route('/:userId')
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById)

router.route('/').post(createUser).get(getAllUsers)

// User's Chatbots Routes
router.route('/:userId/chatbots').post(createChatbot).get(getAllChatbots)

module.exports = router
