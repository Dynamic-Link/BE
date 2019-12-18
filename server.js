require("dotenv").config()
const express = require("express")
const logger = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const passport = require("passport")
const path = require("path")
const keys = require("./config/keys")
const mongoose = require("mongoose")
//routes
const users = require("./routes/api/users")
const links = require("./routes/api/links")
//init
const server = express()

//middleware
server.use(express.json())
server.use(
  express.urlencoded({
    extended: false
  })
)
server.use(helmet())
server.use(cors())
server.use(logger("dev"))
//passport
server.use(passport.initialize())
server.use(passport.session())
require("./config/passport")(passport)

//connect mongo
const db = require("./config/keys").mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

const auth = passport.authenticate("jwt", { session: false })
//connect routes
server.use("/api/account", users)
server.use("/api/links", auth, links)

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  server.use(express.static("client/build"))
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// 404
server.use(function(req, res, next) {
  return res
    .status(404)
    .send({ message: "[Route] --> " + req.url + " <-- Not found." })
})
// 500 - Any server error
server.use(function(err, req, res, next) {
  return res.status(500).json({ error: err })
})
const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(`
-----------------------------------------------------------------------
                🔥  Server listening on port ${port} 🔥
-----------------------------------------------------------------------
  `)
})
