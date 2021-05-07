var express = require("express");
var router = express.Router();
var checkpoints = require("../dummydb/checkpoints.json");
var trackings = require("../dummydb/trackings.json");

/* GET home page. */
router.get("/", function (req, res) {
 console.log(checkpoints);

 res.json(checkpoints);
});
router.post("/trackings", function (req, res) {
 const { email } = req.body;
 if (email) {
  const userTrackings = trackings.filter((track) => track.email === email);
  res.status(200).json(userTrackings);
 }
 if (email === "") {
  res.status(400).json("empty");
 }
});

module.exports = router;
