import crypto from 'crypto';
import Transaction from "../models/transaction.js";
import User from "../models/user.model.js";

export const razorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    // The raw body is needed for signature verification
    const requestBody = req.rawBody;

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(requestBody);
    const digest = shasum.digest('hex');
    
    console.log("Digest:", digest);
    console.log("Razorpay Signature:", req.headers['x-razorpay-signature']);
    
    if (digest !== req.headers['x-razorpay-signature']) {
        console.error("Webhook Error: Invalid signature");
        return res.status(403).json({ success: false, message: "Invalid signature" });
    }
    console.log("Webhook signature verified successfully.");

    // Now that the signature is verified, parse the body.
    const { event, payload } = JSON.parse(requestBody);
    
    // Get transactionId from the correct location based on the event type.
    const transactionId = payload.payment_link?.reference_id || payload.payment?.entity?.notes?.transaction_id;

    console.log("Trasaction", transactionId);
    console.log("payload", payload);
    
    if (!transactionId) {
        // Not an event we can link to a transaction, but acknowledge it.
        return res.json({ status: 'ok' });
    }

    try {
        switch (event) {
            case 'payment_link.paid':
                const transaction = await Transaction.findById(transactionId);

                if (!transaction) {
                    console.warn(`Webhook: Transaction not found for id: ${transactionId}`);
                    break;
                }

                // Idempotency check
                if (transaction.isPaid) {
                    console.log(`Webhook: Transaction ${transactionId} already processed.`);
                    break;
                }

                transaction.isPaid = true;
                transaction.status = 'paid';
                await transaction.save();

                await User.findByIdAndUpdate(transaction.userId, { $inc: { credits: transaction.credits } });
                console.log(`Webhook: Credits added for transaction ${transactionId}`);
                break;

            case 'payment_link.cancelled':
                await Transaction.findByIdAndUpdate(transactionId, { status: 'cancelled' });
                console.log(`Webhook: Transaction ${transactionId} cancelled.`);
                break;

            case 'payment_link.expired':
                await Transaction.findByIdAndUpdate(transactionId, { status: 'expired' });
                console.log(`Webhook: Transaction ${transactionId} expired.`);
                break;

            // The 'payment.failed' event can also be useful if you want to log failed attempts.
            case 'payment.failed':
                // You might want to log this event without changing the transaction status,
                // as the user can try to pay again.
                const { error_code, error_description } = payload.payment.entity;
                console.log(`Webhook: Payment failed for transaction ${transactionId}. Reason: ${error_code} - ${error_description}`);
                break;

            default:
                console.log(`Webhook: Received unhandled event: ${event}`);
        }
    } catch (error) {
        console.error(`Webhook Error processing event ${event} for transaction ${transactionId}:`, error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ status: 'ok' });
};