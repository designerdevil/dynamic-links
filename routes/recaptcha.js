var express = require("express");
var router = express.Router();

/* GET recaptcha page. */
router.post("/", function (req, res, next) {
  const formBody = req.body;
  res.render("recaptcha", {
    title: `Recaptcha - Submit Page`,
    markup: `
    <h2>Submitted id : ${formBody && formBody.listId}</h2>
    <h2>Submitted name : ${formBody && formBody.firstName}</h2>
    `,
  });
});
router.get("/", function (req, res, next) {
  res.render("recaptcha", {
    title: `Recaptcha - Page`,
    markup: '',
  });
});

module.exports = router;
