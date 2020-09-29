const express = require("express");
const path = require("path");
const app = express();
const productsRouter = require("./routes/products");
const productsApiRouter = require("./routes/api/products");
const bodyParser = require("body-parser");

/** Static */
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

/** Routes */
app.use("/products", productsRouter);

/** Route API */
app.use("/api/products", productsApiRouter);

app.use(bodyParser.json());

const server = app.listen(8000, function () {
  console.log(`listening in http://localhost:${server.address().port}`);
});
