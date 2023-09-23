const dotenv = require('dotenv')
const express = require('express')

const sequelize = require('./utils/db')
require('./models') // To load all models and associations
const apiRoutes = require('./routes')

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
	res.status(200).send('OK')
})

// API routes
app.use('/api/v1', apiRoutes)

// Handle unknown routes
app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Resource not found' })
})

const port = process.env.PORT || 4000
app.listen(port, async () => {
	try {
		await sequelize.sync()
		await sequelize.authenticate()
		console.log('Database connection established successfully')
		console.log(`Server listening on port ${port}`)
	} catch (err) {
		console.error('Unable to connect to the database:', err)
	}
})
