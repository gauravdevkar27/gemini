import express from 'express'
import { protect } from '../middlewares/auth.js'
import { textMessageController, imageMsgController } from '../controllers/messageController.js'
const messageRouter = express.Router()

messageRouter.post('/text', protect, textMessageController)
messageRouter.post('/image', protect, imageMsgController)


export default messageRouter;