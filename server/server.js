import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoutes.js'
import { razorpayWebhook } from './controllers/webhook.controller.js'

const app = express()

await connectDB()

app.use(cors())

//Razorpay webhook
app.post('/api/razorpay', express.raw({type: 'application/json'}), razorpayWebhook)

app.use(express.json())

//Routes
app.get('/api', (req, res) => res.send("Server is Live!"))
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

// Export the app for Vercel
export default app;