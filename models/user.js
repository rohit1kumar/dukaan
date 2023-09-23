const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define(
	'User',
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
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
		defaultScope: {
			attributes: { exclude: ['password'] }
		}
	}
)

module.exports = User
