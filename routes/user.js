const router = require('express').Router()
const {
	createUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
} = require('../controllers/user')

router
	.route('/:userId')
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById)

router.route('/').post(createUser).get(getAllUsers)

module.exports = router
