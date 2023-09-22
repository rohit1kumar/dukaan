const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const EndUser = sequelize.define(
	'EndUser',
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
