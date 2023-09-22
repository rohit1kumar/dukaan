const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
		timestamps: true
	}
)

module.exports = User
