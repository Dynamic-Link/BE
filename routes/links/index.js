const server = require("express").Router()
const db = require("../../common/helpers")
const validateLinks = require("../../validation/links")

returnLinks = async (req, res) => {
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

// @route    http://localhost:5000/api/links
// @desc     get all link
// @Access   Private
server.get("/", async (req, res) => {
  returnLinks(req, res)
})

// @route    http://localhost:5000/api/links/:id
// @desc     Get single link by id
// @Access   Private
server.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res
      .status(400)
      .json({ message: "Please make sure you are passing params id" })
  }
  try {
    const link = await db.findBy("links", { id })
    if (link) {
      res.status(200).json(link)
    } else {
      res.status(404).json({ message: "link not found" })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// @route    http://localhost:5000/api/links
// @desc    Post a new Link
// @Access   Private
server.post("/", async (req, res) => {
  const user_id = req.decoded.id
  const { message, isValid } = validateLinks(req.body)
  if (!isValid) {
    return res.status(400).json({ message })
  }
  try {
    const [id] = await db.insert("links", { ...req.body, user_id })
    if (id) {
      returnLinks(req, res)
    } else {
      res
        .status(404)
        .json({ message: "There was an issue adding link at that ID." })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// @route    http://localhost:5000/api/links/:id
// @desc     Delete
// @Access   Private
server.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const exists = await db.findBy("links", { id })
    if (!exists) {
      return res.status(404).json({ message: "Link not found" })
    }
    if (exists.user_id !== req.decoded.id) {
      return res
        .status(403)
        .json({ message: "You cannot delete someone else link" })
    }
    await db.remove("links", id)
    res.json({ message: "Link successfully deleted." })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})
// @route    http://localhost:5000/api/:id
// @desc     Update
// @Access   Private
server.put("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const exists = await db.findBy("links", { id })
    if (!exists) {
      return res.status(404).json({ message: "Link not found" })
    }
    if (exists.user_id !== req.decoded.id) {
      return res
        .status(403)
        .json({ message: "You cannot delete someone else link" })
    }
    await db.update("links", id, { ...req.body })
    res.json({ message: "Link successfully updated." })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})
module.exports = server
