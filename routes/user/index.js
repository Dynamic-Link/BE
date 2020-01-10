const server = require("express").Router()
const db = require("../../common/helpers")

returnLinksAndCurrentUser = async (req, res) => {
  try {
    let users = await db.findAllBy("users", { id: req.decoded.id })
    const results = users.map(async user => {
      const links = await db.findAllBy("links", { user_id: user.id })
      user.links = links
      return user
    })

    Promise.all(results).then(completed => {
      users = completed
      res.json(users)
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

// @route    http://localhost:5000/api/user
// @desc    Get Current User
// @Access   Private
server.get("/", async (req, res) => {
  returnLinksAndCurrentUser(req, res)
})

module.exports = server
