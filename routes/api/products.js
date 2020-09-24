const express = require("express");
const router = express.Router();
const productsMocks = require("../../utils/mocks/products");

router.get("/", function (req, res) {
  const { query } = req.query;

  res.status(200).json({
    data: productsMocks,
    message: "products listed",
  });
});

router.get("/:productId", function (req, res) {
  const { productId } = req.params;

  res.status(200).json({
    data: productsMocks[0],
    message: "products retrieved",
  });
});

router.post("/", function (req, res) {
  res.status(201).json({
    data: productsMocks[0],
    message: "product created",
  });
});

router.put("/:productId", function (req, res) {
  res.status(200).json({
    data: productsMocks,
    message: "products updated",
  });
});

router.delete("/:productId", function (req, res) {
  res.status(200).json({
    data: productsMocks[0],
    message: "products deleted",
  });
});

module.exports = router;
