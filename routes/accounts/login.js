const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const getUser = require('../../middleware/getUser')
// const getAdmin = require('../../middleware/getAdmin')
const {generateAccessToken, generateRefreshToken} =  require('../../utils/generateToken')
const { request } = require('express')
const merchant = require('../../models/merchant')
const customer = require('../../models/customer')
// const authenticateToken = require('../../middleware/authenticateToken')


router.get('/',(req,res) =>{
    res.render('login.js')
})

router.post('/merchant/', async(req,res)=> {
    console.log(req.body)
    const user = await merchant.findOne({ where: { username: req.body.username } });
    if (user) {
        console.log("inside user")
        if (user.password === req.body.password) {
            const accessToken = generateAccessToken(user)
            res.json({ accessToken: accessToken }) 
        }  else {
            console.log('Wrong credentials!')
            res.status(400).json({error: "Wrong credentials"})  // Move this line here
        }
    } else {
        console.log('User Not found!');
        res.status(400).json({error: "User Not found!"})  // Add this line here
    }
    
})


router.post('/customer/', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    if (username) {
        const user = await customer.findOne({ where: { username } });
        if (user) {
            if (user.password === req.body.password) {
                const accessToken = generateAccessToken(user);
                res.json({ accessToken: accessToken });
            } else {
                console.log('Wrong credentials!');
            }
        } else {
            console.log('User Not found!');
        }
    } else {
        console.log('Username is undefined in the request body!');
    }
});

module.exports = router;
