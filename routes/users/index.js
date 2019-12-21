const server = require("express").Router()

server.get("/", (req, res) => {
  res.send("nada")
})

module.exports = server
