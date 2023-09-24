const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_SECRET = process.env.JWT_SECRET || 'thisisasecret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
/*
 * Login user
 * POST /auth/login
 */
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({
			where: { email },
			attributes: { include: ['password'] }
		})

		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized',
				error: 'Authentication credentials invalid'
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (isMatch) {
			const payload = { id: user.id }

			const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
			return res.status(200).json({
				status: 'ok',
				message: 'User logged in successfully',
				token
			})
		} else {
			res.status(401).json({
				status: 'error',
				message: 'Unauthorized',
				error: 'Authentication credentials invalid'
			})
		}
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
			error: err?.message
		})
	}
}
