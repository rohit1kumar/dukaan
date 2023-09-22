const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const Chatbot = sequelize.define(
	'Chatbot',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
