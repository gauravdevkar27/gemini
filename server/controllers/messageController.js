import Chat from '../models/Chat.js'
import User from '../models/user.model.js'
//Text based ai chat msg controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId, prompt } = req.body

        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({
            role: "user", content: prompt, timestamp: Date.now(),
            isImage: false
        })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
               {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {
            ...choices[0].message, timestamp: Date.now(),
            isImage: false
        }

        chat.messages.push(reply)
        res.json({ success: true, reply })
        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })



    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}

// Image generation msg controller

export const imageMsgController = async (req, res) => {
    try{
      const userId = req.user._id;
      if(req.user.credits < 2){
        return res.json({success: false, message: "You don`t have enough credits to use this feature"})

      }

      const {prompt, chatId, isPublished} = req.body
      //find chat
      const chat = await Chat.findOne({userId, _id: chatId})
    
       // push user msg
     chat.messages.push({
        role: "user",
        content: prompt,
        timestamp: Date.now(),
        isImage: false
     });

    }catch(error){

    }
}