const User = require("../models/User")

class UserController {
  // GET Users
  async index(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // Get newss/:id
  async showUsers(req, res) {
    try {
      const blog = await User.findById(req.params.id)
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // POST Users/create
  async create(req, res) {
    const newUser = await new User(req.body)
    try {
      const saveUser = await newUser.save()
      res.status(200).json(saveUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new UserController()
