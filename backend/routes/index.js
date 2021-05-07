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
 if (!email) {
  return res.status(400).json("empty");
 }
 const userTrackings = trackingsDB.filter((track) => track.email === email);
 if (!userTrackings[0]) {
  return res.status(404).json("");
 }
 res.status(200).json(userTrackings);
});

router.post("/checkpoint", (req, res) => {
 const { tracking_numbers } = req.body;

 const latestOrderStatus = tracking_numbers.map((tracking_number) => {
  //makes array of all items with submitted tracking numbers
  const orderStatuses = checkpointsDB.filter(
   (c) => c.tracking_number === tracking_number,
  );
  //returns tracking number with more current date
  return orderStatuses.reduce((acc, cur) => {
   if (compareDates(cur.timestamp, acc.timestamp)) return cur;
   return acc;
  }, orderStatuses[0]);
 });

 res.status(200).json(latestOrderStatus);
});

module.exports = router;
