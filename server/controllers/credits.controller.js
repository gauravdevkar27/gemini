import Transaction from "../models/transaction.js"
import User from "../models/user.model.js"
import Razorpay from 'razorpay'

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]

export const getPlans = async (req, res) => {
    try {
        res.json({
            success: true, plans
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}



export const purchasePlan = async (req, res) => {
    try {
        
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });
       

        const { planId } = req.body
        const userId = req.user._id
        const plan = plans.find(plan => plan._id === planId)

        if (!plan) {
            return res.json({
                success: false, message: "Invalid plan"
            })
        }

        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        })
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        console.log('Creating payment link with:', {
            amount: plan.price * 100,
            currency: "INR",
            reference_id: transaction._id.toString(),
            description: `Purchase of ${plan.name} plan`,
            callback_url: `${frontendUrl}/credits?transaction_id=${transaction._id.toString()}`,
            callback_method: 'get',
        });

        const paymentLink = await instance.paymentLink.create({
            amount: plan.price * 100,
            currency: "INR",
            reference_id: transaction._id.toString(),
            description: `Purchase of ${plan.name} plan`,
            callback_url: `${frontendUrl}/credits?transaction_id=${transaction._id.toString()}`,
            callback_method: 'get',
        });
        
        console.log('Payment Link Created:', paymentLink.short_url);

        res.json({
            success: true,
            url: paymentLink.short_url,
        });

    } catch (error) {
        console.error("Error caught at:", error.statusCode);
        console.error("Error description:", error.error?.description);
        console.error("Full Error:", error);

        res.json({
            success: false,
            message: error.message || "Unknown error"
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { transactionId } = req.body

        const transaction = await Transaction.findById(transactionId)

        if (!transaction) {
            return res.json({ success: false, message: "Transaction not found" })
        }

        transaction.isPaid = true
        await transaction.save()

        await User.updateOne(
            { _id: transaction.userId },
            { $inc: { credits: transaction.credits } }
        )

        res.json({ success: true, message: "Credits added successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}