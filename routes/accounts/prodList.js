const express = require('express')
const bcrypt = require('bcrypt')
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router()
const product = require('../../models/product')
const authenticateToken = require('../../middleware/authenticateToken')

router.post('/create', authenticateToken, async(req, res) => {
    const Product = await product.create({
        merchant_id: req.user.id, 
        prod_name: req.body.prod_name,
        description: req.body.description, 
        price: req.body.price, 
        image: req.body.image
        
    });
    try {
        console.log("merchant's auto-generated ID:", Product.id);
        console.log(Product.prod_name);
        res.status(201).json("Product added")
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Change the route definition from /readOne to /readOne/:productId
router.get('/readOne/:id', authenticateToken, async (req, res) => {
    try {
        // Access the product ID from the route parameters
        const productId = req.params.id;

        // Retrieve the product using the product ID and merchant_id from the request user
        const Product = await product.findOne({
            where: { id: productId, merchant_id: req.user.id }
        });

        console.log(Product);

        if (!Product) {
            res.send({
                product: "Product not found"
            });
        }

        res.send({ product: Product });
    } catch (err) {
        res.send(err);
    }
});




router.get('/readAll',authenticateToken, async(req,res) => {
   try{
    const Product = await product.findAll({where: {merchant_id:req.user.id}});
    console.log(Product);
    res.send(Product);
   } catch (err) {
    console.log(err);
    res.send(err)
   }
})

router.get('/getAll', async(req,res) => {
    try{
     const Product = await product.findAll({where: {merchant_id:req.query.merchant_id}});
     console.log(Product);
     res.send(Product);
    } catch (err) {
     console.log(err);
     res.send(err)
    }
 })

// Change the route definition from /update to /update/:productId
router.post('/update/:id', authenticateToken, async (req, res) => {
    try {
        // Access the product ID from the route parameters
        const productId = req.params.id;

        const field = {};

        if (req.body.prod_name) {
            field.prod_name = req.body.prod_name;
        }
        if (req.body.description) {
            field.description = req.body.description;
        }
        if (req.body.price) {
            field.price = req.body.price;
        }

        console.log(field);
        console.log(req.body);

        // Update the product using the product ID and merchant_id from the request user
        const [updatedCount] = await product.update(field, {
            where: { id: productId, merchant_id: req.user.id }
        });

        if (updatedCount === 0) {
            res.send('No products were updated');
        } else {
            res.send(`${updatedCount} number of records were updated`);
        }
    } catch (err) {
        res.send(err);
    }
});



// Change the route definition from /delete to /delete/:productId
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        // Access the product ID from the route parameters
        const productId = req.params.id;

        // Delete the product using the product ID and merchant_id from the request user
        const deletedCount = await product.destroy({
            where: {
                id: productId,
                merchant_id: req.user.id
            }
        });

        if (deletedCount === 0) {
            res.send('No products were deleted');
        } else {
            res.send(`${deletedCount} number of records were deleted`);
        }
    } catch (err) {
        res.send(err);
    }
});




module.exports = router