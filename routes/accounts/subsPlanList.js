
const express = require('express');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();
const subsPlan = require('../../models/subs_plan'); // Rename subsPlan to SubsPlan
const subsPlanProd = require('../../models/subsPlan_prod'); // Rename subPlanProd to SubPlanProd
const Product = require('../../models/product'); // Import the Product model
const authenticateToken = require('../../middleware/authenticateToken');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { plan_name, description, plan_type, price, duration, product_id } = req.body;

        // Check if the product IDs are provided
        if (!product_id) {
            return res.status(400).json({ message: 'Product_ids are required' });
        }

        // Ensure product_ids is converted to an array
        const productIdsArray = Array.isArray(product_id) ? product_id : [product_id];

        // Check if all products exist in the products table
        for (const product_id of productIdsArray) {
            const existingProduct = await Product.findByPk(product_id);
            if (!existingProduct) {
                return res.status(400).json({ message: `Product with ID ${product_id} not found` });
            }
        }

        const subsPlanInstance = await subsPlan.create({
            merchant_id: req.user.id,
            plan_name,
            description,
            plan_type,
            price,
            duration
        });

        console.log("Subscription plan ID:", subsPlanInstance.id);
        console.log(subsPlanInstance.plan_name);

        // Create records in subPlanProd table for each product
        for (const product_id of productIdsArray) {
            const subPlanProdInstance = await subsPlanProd.create({
                plan_id: subsPlanInstance.id,
                product_id
            });

            console.log("subPlanProd ID:", subPlanProdInstance.id);
            console.log("Product ID:", subPlanProdInstance.product_id);
        }

        res.status(201).json("Subscription plan added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


router.get('/readOne/:id', authenticateToken, async (req, res) => {
    try {
        // Extracting merchantId from the token
        const merchant_id = req.user.id;

        // Fetching subscription plan based on the specific ID provided in the URL
        const subsPlanInstance = await subsPlan.findOne({ where: { id: req.params.id, merchant_id } });

        if (!subsPlanInstance) {
            res.send({
                subsPlan: "Subscription plan not found"
            });
            return;
        }

        // Fetching subscription plan products based on plan_id
        const subsPlanProds = await subsPlanProd.findAll({ where: { plan_id: subsPlanInstance.id } });

        // Initializing an empty array to store products
        const productsArray = [];

        // Mapping through each subsPlanProd to fetch product details from the product table
        for (const subsPlanProd of subsPlanProds) {
            const product = await Product.findOne({ where: { id: subsPlanProd.product_id } });
            productsArray.push(product);
        }

        // Sending the response with subscription plan details and product array
        res.send({
            subsPlan: subsPlanInstance,
            products: productsArray
        });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



// router.get('/readOne', authenticateToken, async(req,res) => {
//     try{
//         const SubsPlan = await subsPlan.findOne({ where: { id: req.body.id}});
//         console.log(SubsPlan);
//         if (!SubsPlan) res.send({
//             subsPlan: "Subscription plan not found"
//         });
//         res.send({subsPlan: SubsPlan});
//     } catch (err) {
//         res.send(err);
//     }
// })

router.get('/readAll', authenticateToken, async (req, res) => {
    try {
        // Extracting merchantId from the token
        const merchant_id = req.user.id;

        // Fetching all subscription plans for the given merchant
        const allSubsPlans = await subsPlan.findAll({ where: { merchant_id } });

        // Initializing an array to store subscription plans with associated products
        const subsPlansWithProducts = [];

        // Iterate through each subscription plan
        for (const subsPlanInstance of allSubsPlans) {
            // Fetching subscription plan products based on plan_id
            const subsPlanProds = await subsPlanProd.findAll({ where: { plan_id: subsPlanInstance.id } });

            // Initializing an array to store products for the current subscription plan
            const productsArray = [];

            // Mapping through each subsPlanProd to fetch product details from the product table
            for (const subsPlanProd of subsPlanProds) {
                const product = await Product.findOne({ where: { id: subsPlanProd.product_id } });
                productsArray.push(product);
            }

            // Add subscription plan details along with products to the array
            subsPlansWithProducts.push({
                subsPlan: subsPlanInstance,
                products: productsArray
            });
        }

        // Sending the response with an array of subscription plans and associated products
        res.send({ allSubsPlans: subsPlansWithProducts });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        // Extracting merchantId from the token
        const merchant_id = req.query.merchant_id;

        // Fetching all subscription plans for the given merchant
        const allSubsPlans = await subsPlan.findAll({ where: { merchant_id } });

        // Initializing an array to store subscription plans with associated products
        const subsPlansWithProducts = [];

        // Iterate through each subscription plan
        for (const subsPlanInstance of allSubsPlans) {
            // Fetching subscription plan products based on plan_id
            const subsPlanProds = await subsPlanProd.findAll({ where: { plan_id: subsPlanInstance.id } });

            // Initializing an array to store products for the current subscription plan
            const productsArray = [];

            // Mapping through each subsPlanProd to fetch product details from the product table
            for (const subsPlanProd of subsPlanProds) {
                const product = await Product.findOne({ where: { id: subsPlanProd.product_id } });
                productsArray.push(product);
            }

            // Add subscription plan details along with products to the array
            subsPlansWithProducts.push({
                subsPlan: subsPlanInstance,
                products: productsArray
            });
        }

        // Sending the response with an array of subscription plans and associated products
        res.send({ allSubsPlans: subsPlansWithProducts });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



// router.get('/readAll', authenticateToken, async(req,res) => {
//     try{
//      const SubsPlan = await subsPlan.findAll();
//      console.log(SubsPlan);
//      res.send(SubsPlan);
//     } catch (err) {
//      console.log(err);
//      res.send(err)
//     }
//  })

 router.delete('/delete', authenticateToken, async(req,res) => {
    try{
        const SubsPlan = await subsPlan.destroy({
            where: {
                id: req.body.id
            }
        });
        if (SubsPlan === 0) {
            res.send('No Subscription plans were deleted');
        } else {
            res.send(`${SubsPlan} number of records were deleted`);
        }
    } catch(err) {
        res.send(err);
    }
})

module.exports = router