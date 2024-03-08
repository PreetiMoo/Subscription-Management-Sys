const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    console.log("inside generate access token", user);

    // Assuming user has properties like 'name' and 'email'
    const tokenData = {
        id: user.id ,
        username: user.username
    };

    const expiresIn = 2 * 60 * 60; 

    return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        //expiresIn: expiresIn
    });
}


function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {generateAccessToken, generateRefreshToken}