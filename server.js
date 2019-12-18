const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app = express();
const users = require("./routes/api/users");
const insta = require("./routes/api/insta");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger());

//connect mongo
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//connect routes
app.use("/api/users", users);
app.use("/api/insta", insta);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`server running on port ${port}`));
