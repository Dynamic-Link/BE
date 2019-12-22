const server = require("express").Router()
const db = require("../../common/helpers")

// @route    http://localhost:5000/api/user
// @desc    Get Current User
// @Access   Private
server.get("/", async (req, res) => {
  const { email } = req.decoded
  console.log("req.decoded", req.decoded)

  try {
    let user = await db.findBy("users", { email })
    res.json({ ...user, links: [] })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

module.exports = server
