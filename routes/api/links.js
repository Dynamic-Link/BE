const server = require("express").Router()
const User = require("../../models/User")
const validateAddLink = require("../../validation/validateAddLink")
//-----------------------------------------------------------
// @route    /api/links/addLink
// @desc     add new link
// @Access   Private
//-----------------------------------------------------------
server.post("/addLink", async (req, res) => {
  const {
    linkName,
    product,
    promotions,
    notes,
    defaultUrl,
    utmParameters
  } = req.body
  const { email } = req.user

  /// handle error checks
  const { errors, isValid } = validateAddLink(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    let user = await User.findOne({
      email
    })
    user.links.push({
      linkName,
      product,
      promotions,
      notes,
      defaultUrl,
      utmParameters
    })
    user.save()
    res.json(user => res.json(user))
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

//-----------------------------------------------------------
// @route    /api/links/:id
// @desc     delete a link
// @Access   Private
//-----------------------------------------------------------
server.delete("/:id", (req, res) => {
  const { id } = req.params
  const { email } = req.user
  User.findOne({ email }, (err, user) => {
    if (err) res.status(401).json({ success: false })
    const userLinks = user.links.filter(links => links._id !== id)
    user.links = userLinks
    profile.save().then(() => {
      User.find({}, (err, user) => {
        if (err) return res.status(401).json({ success: false })
        res.json(user)
      })
    })
  })
})

///  update links
module.exports = server
