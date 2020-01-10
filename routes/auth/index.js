const server = require("express").Router()
const bcrypt = require("bcryptjs")

const { generateToken } = require("../../common/authentication")
const validateRegister = require("../../validation/register")
const validateLogin = require("../../validation/login")
const db = require("../../common/helpers")

// @route    http://localhost:5000/api/account/signup
// @desc     Register User
// @Access   Public
server.post("/signup", async (req, res) => {
  let { password, email, firstName, lastName, isDeleted } = req.body
  const { message, isValid } = validateRegister(req.body)
  if (!isValid) return res.status(400).json({ message })
  try {
    const exists = await db.findBy("users", { email })
    if (exists)
      return res
        .status(400)
        .json({ message: "User with that email already exists" })
    password = await bcrypt.hash(password, 1)
    await db.insert("users", {
      password,
      email,
      firstName,
      lastName,
      isDeleted
    })
    const user = await db.findBy("users", { email })
    const token = await generateToken(user)
    res.status(201).json({
      ...user,
      token
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

// @route    http://localhost:5000/api/account/signin
// @desc     Signin user
// @Access   Public
server.post("/signin", async (req, res) => {
  const { email, password } = req.body
  const { message, isValid } = validateLogin(req.body)
  if (!isValid) return res.status(400).json({ message })

  try {
    const user = await db.findBy("users", { email })
    if (user) {
      const correct = await bcrypt.compare(password, user.password)
      if (correct) {
        const token = await generateToken(user)
        res.json({
          ...user,
          token
        })
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

module.exports = server
