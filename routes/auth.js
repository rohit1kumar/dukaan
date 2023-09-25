const router = require('express').Router()

const { login } = require('../controllers/auth')
const { validateLogin } = require('../middlewares/validator')

// Auth Routes
router.route('/login').post(validateLogin, login)

module.exports = router
