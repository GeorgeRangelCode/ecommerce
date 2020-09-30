const express = require("express");
const router = express.Router();
const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async function (req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products });
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: "product retrieved",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
