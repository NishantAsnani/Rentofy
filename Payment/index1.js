const express = require('express');
const razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || '5000';

app.get("/", (req, res) => {
    res.send("hello world...");
});

app.post("/payment", async (req, res) => {

    var amount = req.body;

    const razorpayInstance = new razorpay({
        key_id: rzp_test_Qt8FL35NaoTLl3,
    
        key_secret: ZWN6cfhAiHbgxSKCCrggFVDu
    });

    var order = await razorpayInstance.order.create({
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    });

    res.status(201).json({
        success: true,
        receipt: order.receipt,
        currency: order.currency,
        amount: order.amount
    });
});

app.listen(PORT, () => {
    console.log("Server is listing on PORT : ", PORT);
});