const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const Conversation = sequelize.define(
	'Conversation',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'ongoing' // ongoing, completed or suspended
		}
	},
	{
		timestamps: true
	}
)

module.exports = Conversation
