const { User } = require('../models')

const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET || 'thisisasecret'

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await User.findByPk(jwt_payload.id)
			if (user) {
				return done(null, user)
			}
			return done(null, false)
		} catch (err) {
			return done(err, false)
		}
	})
)
