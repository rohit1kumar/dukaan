const Joi = require('joi')

const validatePayload = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		return res.status(400).json({
			status: 'error',
			message: 'Bad request',
			error: error.details[0].message.replace(/['"]/g, '')
		})
	}
	next()
}

exports.validateLogin = validatePayload(
	Joi.object({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(5).required()
	})
)
exports.validateCreateUser = validatePayload(
	Joi.object({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(5).required()
	})
)

exports.validateUpdateUser = validatePayload(
	Joi.object({
		name: Joi.string().trim(),
		email: Joi.string().trim().email(),
		password: Joi.string().trim().min(5)
	})
)

exports.validateCreateChatbot = validatePayload(
	Joi.object({
		name: Joi.string().trim().required(),
		description: Joi.string().trim().required()
	})
)

exports.validateUpdateChatbot = validatePayload(
	Joi.object({
		name: Joi.string().trim(),
		description: Joi.string().trim()
	})
)

exports.validateCreateConversation = validatePayload(
	Joi.object({
		endUserId: Joi.string().trim().required()
	})
)

exports.validateUpdateConversation = validatePayload(
	Joi.object({
		status: Joi.string().trim()
	})
)

exports.validateCreateEndUser = validatePayload(
	Joi.object({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required()
	})
)

exports.validateUpdateEndUser = validatePayload(
	Joi.object({
		name: Joi.string().trim(),
		email: Joi.string().trim().email()
	})
)
