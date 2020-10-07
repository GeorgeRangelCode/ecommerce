const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const boom = require("boom");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const authApiRouter = require("./routes/api/auth");
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");
const isRequestAjaxOrAPI = require("./utils/isRequestAjaxOrAPI");

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
// app.use("/api/products", productsApiRouter);
productsApiRouter(app);

/** Route Auth */
app.use("/api/auth", authApiRouter);

/** Redirect */
app.get("/", function (req, res) {
  res.redirect("/products");
});

app.use(function (req, res, next) {
  if (isRequestAjaxOrAPI(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
});

/** Error Handlers */
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(8000, function () {
  console.log(`listening in http://localhost:${server.address().port}`);
});
