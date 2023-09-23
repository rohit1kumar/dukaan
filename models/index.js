const User = require('./user')
const Chatbot = require('./chatbot')
const Conversation = require('./conversation')
const EndUser = require('./endUser')

User.hasMany(Chatbot, { foreignKey: 'userId' })
Chatbot.belongsTo(User, { foreignKey: 'userId' })

Chatbot.hasMany(Conversation, { foreignKey: 'chatbotId' })
Conversation.belongsTo(Chatbot, { foreignKey: 'chatbotId' })

Conversation.belongsTo(EndUser, { foreignKey: 'endUserId' })
EndUser.hasMany(Conversation, { foreignKey: 'endUserId' })

module.exports = {
	User,
	Chatbot,
	Conversation,
	EndUser
}
