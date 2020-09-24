const express = require("express");
const router = express.Router();
const productsMocks = require("../utils/mocks/products");

router.get("/", function (req, res) {
  res.render("products", { productsMocks });
});

module.exports = router;
