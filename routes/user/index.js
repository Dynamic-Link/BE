const server = require("express").Router()
const db = require("../../common/helpers")

// @route    http://localhost:5000/api/user
// @desc    Get Current User
// @Access   Private
server.get("/", async (req, res) => {
  try {
    let user = await db.get("users")
    res.json(user)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

module.exports = server
