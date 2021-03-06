require("dotenv").config();

const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import middlware
const cors = require("cors");
const morgan = require("morgan");
// const { default: Player } = require("../frontend/src/pages/Player");

//db connection
mongoose.connect(MONGODB_URL);
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected"))
  .on("error", (error) => console.log(error))

//models
const PlayerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  position: String,
  rating: String,
  team: String
});

const Player = mongoose.model('Player', PlayerSchema);

//Middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

//test route
app.get("/", (req, res) => {
  res.send("i wish there was data on players");
});

//Player index routes
app.get("/player", async (req, res) => {
  try {
    res.json(await Player.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//Player Create
app.post("/player", async (req, res) => {
  try {
    res.json(await Player.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Player update
app.put('/player/:id', async (req,res) => {
  try {
    res.json(
      await Player.findByIdAndUpdate(req.params.id, req.body)
    )
  } catch (error) {
    res.status(400).json(error);
  }
})

// Player delete
app.delete("/player/:id", async (req, res) => {
  try {
    res.json(await Player.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

//listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
