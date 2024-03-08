const express = require('express')
const bcrypt = require('bcrypt')
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router()
const merchant = require('../../models/merchant')
const customer = require('../../models/customer')
const customer_merchant = require('../../models/cust_merch')
const authenticateToken = require('../../middleware/authenticateToken');

router.post('/merchant/register/', async(req, res) => {
    const Merchant = await merchant.create({
        
        username: req.body.username,  
        email: req.body.email, 
        password: req.body.password
    });
    console.log("merchant's auto-generated ID:", Merchant.id);
    console.log(Merchant.username);
    res.status(201).json("Merchant added")
})

router.post('/customer/register/', async(req, res) => {
    const Customer = await customer.create({
        
        username: req.body.username,  
        email: req.body.email, 
        password: req.body.password,
        address : req.body.address
    });
    console.log("customer's auto-generated ID:", Customer.id);
    console.log(Customer.username);

    const Cust_merch = await customer_merchant.create({
        
        cust_id: Customer.id,  
        merchant_id: req.body.merchant_id
    });
    console.log(Cust_merch.id);
    res.status(201).json("Customer added")

})





router.post('/merchant/customize/',authenticateToken, async(req, res) => {
    const merchant_id = req.user.id;
    
    res.status(201).json({link:`http://localhost:3001?merchant_id=${merchant_id}`})
})



module.exports = router


