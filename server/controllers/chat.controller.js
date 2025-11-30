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

// API Controller for getting all chats
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({
            userId
        }).sort({ updatedAt: -1 })

        res.json({ success: false, message: error.message });


    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }
}
