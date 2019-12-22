const server = require("express").Router()
const db = require("../../common/helpers")
const validateLinks = require("../../validation/links")

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
      const offer = await db.findBy("links", { id })
      res.status(201).json(offer)
    } else {
      res
        .status(404)
        .json({ message: "There was an issue adding user at that ID." })
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
  const user_id = req.decoded.id
  try {
    const exists = await db.findBy("links", { id })
    if (!exists) return res.status(404).json({ message: "Link not found" })
    if (exists.user_id !== user_id) {
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
    if (exists) {
      if (req.decoded.id !== exists.user_id) {
        res.status(400).json({ message: "You cannot edit someone elses link" })
      } else {
        await db.update("links", id, { ...req.body })
        res.json({ message: "Successfully updated" })
      }
    } else {
      res.status(404).json({ message: "link not found" })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})
module.exports = server
