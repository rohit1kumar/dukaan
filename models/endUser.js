const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const EndUser = sequelize.define(
	'EndUser',
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
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: { isEmail: true }
		}
	},
	{
		timestamps: true
	}
)

module.exports = EndUser
