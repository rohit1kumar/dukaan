const { EndUser } = require('../models')
const { findAllWithPagination } = require('../utils/pagination')

/* Create a new endUser
 * POST /endusers
 * */
exports.createEndUser = async (req, res) => {
	try {
		const { name, email } = req.body

		const isEmailExist = await EndUser.findOne({ where: { email } })
		if (isEmailExist) {
			return res.status(400).json({
				status: 'error',
				message: 'Bad Request',
				error: 'Email already exists'
			})
		}
		const endUser = await EndUser.create({
			name,
			email
		})

		res.status(201).json({
			status: 'ok',
			message: 'End User Created Successfully',
			data: endUser
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get all endUsers
 * GET /endusers
 * */
exports.getAllEndUsers = async (req, res) => {
	try {
		const { limit, page } = req.query
		const endUsers = await findAllWithPagination(EndUser, limit, page)

		res.status(200).json({
			status: 'ok',
			message: 'End Users Fetched Successfully',
			...endUsers
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Get a single endUser
 * GET /endusers/:endUserId
 * */
exports.getSingleEndUser = async (req, res) => {
	try {
		const { endUserId } = req.params

		const endUser = await EndUser.findByPk(endUserId)

		if (!endUser) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'End User not found with the provided id'
			})
		}

		res.status(200).json({
			status: 'ok',
			message: 'End User Fetched Successfully',
			data: endUser
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Update a enduser by endUserId
 * PUT /endusers/:endUserId
 **/
exports.updateEndUserById = async (req, res) => {
	try {
		const { endUserId } = req.params
		const { name, email } = req.body

		const endUser = await EndUser.findByPk(endUserId)

		if (!endUser) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'End User not found with the provided id'
			})
		}

		/* If an enduser with the provided email exists and their ID doesn't match the user
            being updated, it means the email is already taken by another enduser. */
		if (email) {
			const existingUser = await EndUser.findOne({ where: { email } })
			if (existingUser && existingUser.id !== endUserId) {
				return res.status(400).json({
					status: 'error',
					message: 'Bad Request',
					error: 'Email is already taken by another endUser'
				})
			}
		}

		const updatedEndUser = await endUser.update({ name, email })

		res.status(200).json({
			status: 'ok',
			message: 'End User Updated Successfully',
			data: updatedEndUser
		})
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}

/* Delete a enduser by endUserId
 * DELETE /endusers/:endUserId
 **/
exports.deleteEndUserById = async (req, res) => {
	try {
		const { endUserId } = req.params

		const endUser = await EndUser.findByPk(endUserId)

		if (!endUser) {
			return res.status(404).json({
				status: 'error',
				message: 'Not Found',
				error: 'End User not found with the provided id'
			})
		}

		await endUser.destroy()

		res.status(200).json({
			status: 'ok',
			message: 'End User Deleted Successfully',
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
