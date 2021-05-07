var express = require("express");
var router = express.Router();
var checkpoints = require("../dummydb/checkpoints.json");
var trackings = require("../dummydb/trackings.json");

/* GET home page. */
router.get("/", function (req, res, next) {
 res.render("index", { title: "Express" });
});

module.exports = router;
