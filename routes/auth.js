const router = require('express').Router()

const { login } = require('../controllers/auth')

// Auth Routes
router.route('/login').post(login)

module.exports = router
