const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const auth = require("../routes/auth")
const users = require("../routes/users")

const configureMiddleware = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(morgan("dev"))
  server.use(cors())

  // routes
  server.use("/api/auth", auth)
  server.use("/api/users", users)
}

module.exports = {
  configureMiddleware
}
