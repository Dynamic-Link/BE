const server = require("express").Router()
const User = require("../../models/User")

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
  try {
    let user = await User.findOne({
      email
    })
    user.links.push({
      email,
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

module.exports = server
