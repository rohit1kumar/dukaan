const passport = require('passport')

exports.checkAuth = async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if (err) {
			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized',
				error: err?.message
			})
		}

		if (!user) {
			return res.status(403).json({
				status: 'error',
				message: 'Forbidden',
				error: 'You are not authorized to access this resource'
			})
		}
		req.user = user
		next()
	})(req, res, next)
}
