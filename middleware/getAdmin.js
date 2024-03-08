const adminSchema = require('../models/admin')

async function getUser(req, res, next) {
  let user  
  try {
      user = await adminSchema.findOne({ username: req.body.username })
      if (user == null) {
        return res.status(404).json({ message: "Wrong Credentials" })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

  module.exports = getUser