import Chat from '../models/chats.model'

// API controller for creating a new chat
export const createChat = async (req, res) => {
    try{
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New chat",
            userName: req.user.name
        }
        await Chat.create(chatData)
        res.json({
            success: true, message: "Chat created"
        })
    
    } catch(error){
        res.json({
            success: false, error: error.message
        })

    }
}