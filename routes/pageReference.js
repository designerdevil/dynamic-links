var express = require("express");
var router = express.Router();

const filterMarkup = (page) => {
  return `
    <ul>
    <li><a class="filter-item" href="/pagereference/${page}" data-filter-id="1">Filter Id 1</a></li>
    <li><a class="filter-item" href="/pagereference/${page}" data-filter-id="2">Filter Id 2</a></li>
    <li><a class="filter-item" href="/pagereference/${page}" data-filter-id="3">Filter Id 3</a></li>
    <li><a class="filter-item" href="/pagereference/${page}" data-filter-id="4">Filter Id 4</a></li>
    <li><a class="filter-item" href="/pagereference/${page}" data-filter-id="5">Filter Id 5</a></li>
    </ul>
  `;
};

router.get("/page2", function (req, res, next) {
  const generatedMarkup = `
      ${filterMarkup("page1")}
      <div id="counter"></div>
    `;
  res.render("index", {
    title: "Anchor State",
    markup: generatedMarkup,
  });
});
router.get("/page1", function (req, res, next) {
  const generatedMarkup = `
    ${filterMarkup("page2")}
    <div id="counter"></div>
  `;
  res.render("index", {
    title: "Anchor State",
    markup: generatedMarkup,
  });
});

module.exports = router;
