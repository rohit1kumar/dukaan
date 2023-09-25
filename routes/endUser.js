const router = require('express').Router()
const {
	createEndUser,
	getAllEndUsers,
	getSingleEndUser,
	updateEndUserById,
	deleteEndUserById
} = require('../controllers/endUser')
const {
	validateCreateEndUser,
	validateUpdateEndUser
} = require('../middlewares/validator')

// EndUser Routes
router.route('/').post(validateCreateEndUser, createEndUser).get(getAllEndUsers)
router
	.route('/:endUserId')
	.get(getSingleEndUser)
	.put(validateUpdateEndUser, updateEndUserById)
	.delete(deleteEndUserById)

module.exports = router
