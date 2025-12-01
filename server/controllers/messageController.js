import Chat from '../models/chats.model.js'
import User from '../models/user.model.js'
import axios from 'axios'
import openai from '../configs/openai.js'
import imagekit from '../configs/imagekit.js'
//Text based ai chat msg controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        //check credits
        if (req.user.credits < 1) {
            return res.json({ success: false, message: "You don`t have enough credits to use this feature" })

        }

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
    try {
        const userId = req.user._id;
        if (req.user.credits < 2) {
            return res.json({ success: false, message: "You don`t have enough credits to use this feature" })

        }

        const { prompt, chatId, isPublished } = req.body
        //find chat
        const chat = await Chat.findOne({ userId, _id: chatId })

        // push user msg
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        //Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)
        //construct imagekit ai generation url
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/
     ik-genimg-prompt-${encodedPrompt}/Quickgpt/${Date.now()}.png?tr=w-800,
      h-800`;


        // Trigger generation by fetching from imagekit
        const aiImageResponse = await axios.get(generatedImageUrl, { responseType: 'arraybuffer' })

        //convert to base64

        const base64Image = `data:image/png;base64, ${Buffer.from(aiImageResponse.
            data, 'binary').toString('base64')}`;

        //upload to imgkit media libr
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'Quickgpt'
        })

        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        res.json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}