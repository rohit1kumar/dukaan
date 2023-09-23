const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const Chatbot = sequelize.define(
	'Chatbot',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		}
	},
	{
		timestamps: true
	}
)

module.exports = Chatbot
