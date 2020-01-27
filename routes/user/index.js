const server = require("express").Router()
const db = require("../../common/helpers")
const uploadImage = require("../../common/upload")
const multipart = require("connect-multiparty")()

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

//-----------------------------------------------------------
// @route    /api/user
// @desc     Update user detail
// @Access   Public
//-----------------------------------------------------------
server.put("/", multipart, async (req, res) => {
  const { id } = req.decoded

  try {
    if (!req.files.url.path) {
      const success = await db.update("users", id, {
        ...req.body
      })
      if (success) {
        returnLinksAndCurrentUser(req, res)
      } else {
        res
          .status(404)
          .json({ message: "There was an issue editing this user." })
      }
    } else {
      // ------------- cloudinary - ---------
      const { secure_url } = await uploadImage(req)
      // ------------- update - ---------
      const success = await db.update("users", id, {
        avatar: secure_url,
        ...req.body
      })

      if (success) {
        returnLinksAndCurrentUser(req, res)
      } else {
        res
          .status(404)
          .json({ message: "There was an issue editing this user." })
      }
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

//-----------------------------------------------------------
// @route    /api/user
// @desc     DELETE account only owner should be able to do this
// @Access   Private
//-----------------------------------------------------------
server.delete("/", async (req, res) => {
  const { id } = req.decoded
  try {
    await db.remove("users", id)
    // returnCurrent(id, res)
    res.json({ message: "user deleted successfully" })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

module.exports = server
