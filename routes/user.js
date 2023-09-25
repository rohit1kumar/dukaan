const router = require('express').Router()
const {
	createUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
} = require('../controllers/user')
const { createChatbot, getAllChatbots } = require('../controllers/chatbot')
const { checkAuth } = require('../middlewares/auth')
const {
	validateCreateUser,
	validateUpdateUser,
	validateCreateChatbot
} = require('../middlewares/validator')

// User Routes
router
	.route('/:userId')
	.get(getUserById)
	.put(validateUpdateUser, checkAuth, updateUserById)
	.delete(checkAuth, deleteUserById)

router.route('/').post(validateCreateUser, createUser).get(getAllUsers)

// User's Chatbots Routes
router
	.route('/:userId/chatbots')
	.post(validateCreateChatbot, createChatbot)
	.get(getAllChatbots)

module.exports = router
