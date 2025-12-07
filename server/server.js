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

(async function initDB() {
  try {
    await connectDB()
    console.log('DB connected')
  } catch (err) {
    console.error('DB connection failed', err)
  }
})()

app.use(cors())

//const PORT = process.env.PORT || 3000



//Razorpay webhook
app.post('/api/razorpay', express.raw({ type: 'application/json' }), razorpayWebhook)

app.use(express.json())

//Routes
app.get('/', (req, res) => res.send("Server is Live!"))
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

export default app;
