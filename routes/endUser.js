const router = require('express').Router()
const {
	createEndUser,
	getAllEndUsers,
	getSingleEndUser,
	updateEndUserById,
	deleteEndUserById
} = require('../controllers/endUser')

// EndUser Routes
router.route('/').post(createEndUser).get(getAllEndUsers)
router
	.route('/:endUserId')
	.get(getSingleEndUser)
	.put(updateEndUserById)
	.delete(deleteEndUserById)

module.exports = router
