const express = require('express');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const router = express.Router();
const merchant_customization = require('../../models/merchant_customizations');
const authenticateToken = require('../../middleware/authenticateToken');

router.post('/create', authenticateToken, async (req, res) => {
    try {
        let customization = await merchant_customization.findOne({ where: { merchant_id: req.user.id } });

        if (customization) {
            // If customization exists, update it
            await merchant_customization.update({
                logo_url: req.body.logo_url,
                primary_color_schema: req.body.primary_color_schema,
                secondary_color_schema: req.body.secondary_color_schema,
                merchant_link: `http://localhost:3001/plans?merchant_id=${req.user.id}`
            }, {
                where: { merchant_id: req.user.id }
            });

            console.log(customization.id);
            res.status(200).json({ 
                message: "Customization updated",
                link: `http://localhost:3001/plans?merchant_id=${req.user.id}`
            });
        } else {
            // If customization does not exist, create a new one
            customization = await merchant_customization.create({
                merchant_id: req.user.id,
                logo_url: req.body.logo_url,
                primary_color_schema: req.body.primary_color_schema,
                secondary_color_schema: req.body.secondary_color_schema,
                merchant_link: `http://localhost:3001/plans?merchant_id=${req.user.id}`
            });

            console.log(customization.id);
            res.status(201).json({ 
                message: "Customization created",
                link: `http://localhost:3001/plans?merchant_id=${req.user.id}`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/get",authenticateToken, async (req, res) => {
    try{
        const customization = await merchant_customization.findAll({where: {merchant_id:req.user.id}});
        console.log(customization);
        res.send(customization);
       } catch (err) {
        console.log(err);
        res.send(err)
       }
})

module.exports = router;
