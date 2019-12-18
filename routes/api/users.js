const express = require("express")
const server = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")

//import Model
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const User = require("../../models/User")
const auth = passport.authenticate("jwt", { session: false })

// @route   POST api/register
// @desc    Register user
// @access  Public
server.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" })
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        links: req.body.links,
        isDeleted: req.body.isDeleted
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route   POST api/Login
// @desc    Login user
// @access  Public
server.post("/signin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).send(errors)
  }

  const password = req.body.password
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ emailnotfound: "Email not found" })
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email
        }

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              payload,
              token
            })
          }
        )
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" })
      }
    })
  })
})

server.get("/getUser", auth, (req, res) => {
  //res.json(req.user); all data or that
  res.json(req.user)
})

module.exports = server
