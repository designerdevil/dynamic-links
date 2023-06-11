var express = require("express");
var router = express.Router();

// This is your data from API
const linkData = [
  "param1",
  "param2",
  "param3",
  "param4",
  "param5",
  "param6",
  "param7",
  "param8",
];

// This is your logic to generate url for a link
function generateURL(filter = "", filters = []) {
  const baseURL = "/";
  let modifiedFilter = filter;
  let modifiedFilters = filters;
  if (filters.length && filters.indexOf(filter) !== -1) {
    modifiedFilters = filters.filter((item) => item !== filter);
  }
  if (filters.filter((item) => item === filter).length) {
    modifiedFilter = "";
  }
  const url = `${baseURL}?params=${modifiedFilter}${
    modifiedFilters.length && modifiedFilter ? "," : ""
  }${modifiedFilters.join(",")}`;
  return url === baseURL + "?params=" ? baseURL : url;
}

// This is to check if the link is selected or not
function isSelected(filter = "", filters = []) {
  if (filters.filter((item) => item === filter).length) {
    return "selected";
  }
  return "not-selected";
}

// This is generating markup
function generateMarkup(req) {
  const filters =
    req.query && req.query.params ? req.query.params.split(",") : [];
  let bodyMarkup = "<ul>";
  for (let i = 0; i < linkData.length; i++) {
    const currentParam = linkData[i];
    const isLinkSelected = isSelected(currentParam, filters);
    const generatedURL = generateURL(currentParam, filters);
    bodyMarkup += `
        <li><a class="${isLinkSelected}" href="${generatedURL}">LINK${
      i + 1
    } </a>  
          <span style="background:yellow; text-transform: uppercase; font-size: 10px;">${isLinkSelected}</span><br>
          <span style="font-style: italic; font-size: 10px;">${generatedURL}</span>  
        </li>
    `;
  }
  bodyMarkup += "</ul>";
  return bodyMarkup;
}

/* GET home page. */
router.get("/", function (req, res, next) {
  const generatedMarkup = generateMarkup(req);
  res.render("index", {
    title: "Dynamic Linking!",
    markup: generatedMarkup,
  });
});

module.exports = router;
