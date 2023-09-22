const User = require('./User')
const Chatbot = require('./Chatbot')
const Conversation = require('./Conversation')
const EndUser = require('./EndUser')

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
