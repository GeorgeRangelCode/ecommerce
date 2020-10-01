const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const {
  logErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");

/** App */
const app = express();

/** Middlewares */
app.use(bodyParser.json());

/** Static Files */
app.use(express.static(path.join(__dirname, "public")));

/** View Engine Setup */
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

/** Routes */
app.use("/products", productsRouter);

/** Route API */
app.use("/api/products", productsApiRouter);

/** Redirect */
app.get("/", function (req, res) {
  res.redirect("/products");
});

/** Error Handlers */
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(8000, function () {
  console.log(`listening in http://localhost:${server.address().port}`);
});
