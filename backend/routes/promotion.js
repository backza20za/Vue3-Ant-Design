const express = require("express");
const router = express.Router();
const obj = require("../dummy.json");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(obj.promotions);
});

module.exports = router;
