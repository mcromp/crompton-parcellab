var express = require("express");
var router = express.Router();
var checkpointsDB = require("../dummydb/checkpoints.json");
var trackingsDB = require("../dummydb/trackings.json");

const compareDates = (a, b) => {
 const date1 = new Date(a);
 const date2 = new Date(b);
 //return date1 if newer
 return date1.getTime() > date2.getTime();
};

/* GET home page. */
router.get("/", (req, res) => {
 res.status(200).json(checkpointsDB);
});

router.post("/orders", (req, res) => {
 const { email } = req.body;
 if (email === "") res.status(400).json("empty");
 const userTrackings = trackingsDB.filter((track) => track.email === email);
 res.status(200).json(userTrackings);
});

router.post("/checkpoint", (req, res) => {
 const { tracking_number } = req.body;
 const checkpoints = checkpointsDB.filter(
  (c) => c.tracking_number === tracking_number,
 );
 if (!checkpoints) res.status(404);
 //returns the latest checkpoint for requested order
 const latestCheckpoint = checkpoints.reduce((acc, cur) => {
  if (compareDates(cur.timestamp, acc.timestamp)) return cur;
  return acc;
 }, checkpoints[0]);
 res.status(200).json(latestCheckpoint);
});

module.exports = router;
