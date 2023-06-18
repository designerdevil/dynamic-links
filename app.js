var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var paginationRouter = require("./routes/pagination");
var recaptchRouter = require("./routes/recaptcha");
var pageReferenceRouter = require("./routes/pageReference");
var requestInfoRouter = require('./routes/requestinfo');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pagination", paginationRouter);
app.use("/recaptcha", recaptchRouter);
app.use("/pagereference", pageReferenceRouter);
app.use("/requestinfo", requestInfoRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
