// Import necessary modules
const express = require("express");
const router = express.Router();
const Subscription = require("../../models/subscriptions"); // Import the Subscription model
const authenticateToken = require("../../middleware/authenticateToken");
const merchant = require("../../models/merchant");
const subs_plan = require("../../models/subs_plan");
const subscription = require("../../models/subscriptions");

// Route to handle POST requests to create a new subscription
router.post("/create", authenticateToken, async (req, res) => {
  try {
    // Extract subscription details from the request body
    const plan_id = req.body.plan_id;
    const cust_id = req.user.id;
    const plan = await subs_plan.findOne({
      where: { id: plan_id }
    });
    console.log("Plan nfo: ", plan.dataValues.merchant_id);
    if (!plan) {
      return res.status(400).json({ error: "Plan  not found" });
    }
    console.log("Plan_id", plan_id);
    console.log("Cust_id", cust_id);
    // Create a new subscription instance
    const newSubscription = new Subscription({
      plan_id,
      merchant_id: plan.dataValues.merchant_id,
      cust_id,
      start_time: new Date()
    });

    // Save the subscription details to the database
    const savedSubscription = await newSubscription.save();

    // Return a success response
    res.status(201).json(savedSubscription);
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
  const merchantSubscriptionPlans = await subscription.findAll({ where: { merchant_id: req.user.id , payment_status:'success' } }) ;
  res.status(200).json(merchantSubscriptionPlans)
  
});

module.exports = router;
