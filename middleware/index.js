const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const { authenticate } = require("../common/authentication")

const auth = require("../routes/auth")
const user = require("../routes/user")
const links = require("../routes/links")

const configureMiddleware = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(morgan("dev"))
  server.use(cors())

  // routes
  server.use("/api/account", auth)
  server.use("/api/user", authenticate, user)
  server.use("/api/links", authenticate, links)
}

module.exports = {
  configureMiddleware
}
