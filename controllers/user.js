const { User } = require('../models')
const { hashPassword } = require('../utils/passwordUtils')
const { findAllWithPagination } = require('../utils/pagination')
/*
 * Create a new user
 * POST /users
 * */
exports.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		const isEmailExist = await User.findOne({ where: { email } })
		if (isEmailExist) {
			return res.status(400).json({
				status: 'error',
				message: 'Bad Request',
				error: 'Email already exists'
			})
		}

		const hashedPassword = await hashPassword(password)
		const user = await User.create({ name, email, password: hashedPassword })

		// Remove password from user object
		// eslint-disable-next-line no-unused-vars
		const { password: _password, ...userWithoutPassword } = user.toJSON()
		res.status(201).json({
			status: 'ok',
			message: 'User Created',
			data: userWithoutPassword
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/*
 * Get all users
 * GET /users
 */
exports.getAllUsers = async (req, res) => {
	try {
		const { limit, page } = req.query
		const users = await findAllWithPagination(User, limit, page)

		res.status(200).json({
			status: 'ok',
			message: 'Users Retrieved Successfully',
			...users
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/*
 * Get a user by id
 * GET /users/:userId
 */
exports.getUserById = async (req, res) => {
	try {
		const { userId } = req.params
		const user = await User.findByPk(userId, {
			attributes: { exclude: ['password'] }
		})

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'User not found with the provided id'
			})
		}

		res.status(200).json({
			status: 'ok',
			message: 'User Retrieved Successfully',
			data: user
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/*
 * Update a user by id
 * PUT /users/:userId
 */
exports.updateUserById = async (req, res) => {
	try {
		const { userId } = req.params
		const { name, email, password } = req.body

		const user = await User.findByPk(userId)
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'User not found with the provided id'
			})
		}

		/* If a user with the provided email exists and their ID doesn't match the user
		being updated, it means the email is already taken by another user. */
		if (email) {
			const existingUser = await User.findOne({ where: { email } })
			if (existingUser && existingUser.id !== userId) {
				return res.status(400).json({
					status: 'error',
					message: 'Bad Request',
					error: 'Email is already taken by another user'
				})
			}
		}

		/* Using user instance to update instead of using User.update()
		 hence no need to pass userId in the where clause */
		const updatedUser = await user.update({ name, email, password })

		res.status(200).json({
			status: 'ok',
			message: 'User Updated Successfully',
			data: updatedUser
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/*
 * Delete a user by id
 * DELETE /users/:userId
 */
exports.deleteUserById = async (req, res) => {
	try {
		const { userId } = req.params
		await User.destroy({ where: { id: userId } })

		res.status(200).json({
			status: 'ok',
			message: 'User Deleted Successfully',
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
