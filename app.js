const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config - grabbing our MongoDB URI connection

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.error(err));

// Use Routes
app.use("/api/items", items);

// Create a port where we want to use locally as well as when we deploy to Heroku

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
