const userSchema = require('../models/customer')

async function getUser(req, res, next) {
  let user  
  try {
      user = await userSchema.findOne({ email: req.body.email })
      if (user == null) {
        return res.render('login.ejs', { error: true, message: "Wrong Credentials!" })
      }
    } catch (err) {
      return res.render('login.ejs', { error: true, message: "Wrong Credentials!" })
    }
  
    res.user = user
    next()
  }

  module.exports = getUser