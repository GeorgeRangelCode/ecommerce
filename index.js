const express = require("express");
const path = require("path");
const app = express();
const productsRouter = require("./routes/products");
const productsApiRouter = require("./routes/api/products");

/** Static */
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

/** Routes */
app.use("/products", productsRouter);

/** Route API */
app.use("/api/products", productsApiRouter);

const server = app.listen(8000, function () {
  console.log(`listening in http://localhost:${server.address().port}`);
});
