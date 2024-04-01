    // Import necessary modules
const express = require("express");
const router = express.Router();
const Subscription = require("../../models/subscriptions"); // Import the Subscription model
const authenticateToken = require("../../middleware/authenticateToken");
const merchant = require("../../models/merchant");
const subs_plan = require("../../models/subs_plan");
const subscription = require("../../models/subscriptions");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require("axios");

// Route to handle POST requests to create a new subscription
router.post("/makePayment", authenticateToken, async (req, res) => {
  try {
    const customerSubscription = await subscription.findOne({
        where: { id: req.body.subscription_id }
      });

      const plan = await subs_plan.findOne({
        where: { id: customerSubscription.plan_id }
      });

      const merchantTxId = uuidv4()
      await subscription.update(
        { transaction_ID: merchantTxId }, // Data to be updated
        { where: { id: req.body.subscription_id } } // Condition to select the rows to be updated
      );
console.log("uuid",merchantTxId)
console.log("customerID",req.user.id)
console.log("amount",plan.price)
    const data = {
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": merchantTxId,
        "merchantUserId": `${req.user.id}`,
        "amount": plan.price * 100,
        "redirectUrl": "http://localhost:3000/subscriptions",
        "redirectMode": "REDIRECT",
        "callbackUrl": "https://hkdk.events/hsn5nxempg23mm",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
      }
   
      const base64EncodedData = jsonToBase64(data);
      const checksum_value = calculateChecksum(base64EncodedData);


const options = {
  method: 'post',
  url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
  headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum_value
				},
data: {
    request:base64EncodedData
}
};
const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': checksum_value
};

const response = await axios.post(
    "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    {request:base64EncodedData},
    { headers: headers }
);
console.log("RESPONSE", response.data)
res.json({paymentLink:response.data.data.instrumentResponse.redirectInfo}) 
  } catch (error) {
    // Handle errors
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", authenticateToken, async (req, res) => {
  const subscriptions =  await subscription.findAll({ where: { cust_id: req.user.id } });
  console.log("Subscriptions:", subscriptions)
  res.status(200).json(subscriptions)
});

router.get("/merchant/get", authenticateToken, async (req, res) => {
  const merchantSubscriptionPlans = await subscription.findAll({ where: { merchant_id: req.user.id } }) ;
  res.status(200).json(merchantSubscriptionPlans)
  
});

function jsonToBase64(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    const base64String = Buffer.from(jsonString).toString('base64');
    return base64String;
}

function calculateChecksum(encoded_payload) {
    const api_endpoint = "/pg/v1/pay";
    const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const salt_index = 1;
    const concatenated_string = encoded_payload + api_endpoint + salt_key;
    const sha256_hash = crypto.createHash('sha256').update(concatenated_string).digest('hex');
    const checksum_value = sha256_hash + "###" + salt_index;
    return checksum_value;
}

module.exports = router;

