require("dotenv").config();

const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import middlware
const cors = require("cors");
const morgan = require("morgan");

//db connection
mongoose.connect(MONGODB_URL);
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

//test route
app.get("/", (req, res) => {
  res.send("hello world");
});

//listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
