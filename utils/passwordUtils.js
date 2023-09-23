const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(SALT_ROUNDS)
	return bcrypt.hash(password, salt)
}
