var express = require("express");
var router = express.Router();

const pageData = {
  totalRecords: 100,
  pageSize: 10,
}

const getCurrentPageNumber = (req) => {
  const page = (req.params && req.params.pageNo) || 1;
  return page;
}

const generateDummyContent = (current) => {
  return ''
}

const generatePagination = (req, current) => {
  const currentPage = parseInt(current);
  const baseURL = '/pagination';
  const numberOfPages = Math.round(pageData.totalRecords / pageData.pageSize);
  let html = '<div class="pagination">'
  html+= generateDummyContent(currentPage);
  const previousHtml = (currentPage - 1);
  const previousClass = (previousHtml <= 0) ? 'hide' : 'show';
  html+= `<a href="${baseURL}/${previousHtml}" class="prev ${previousClass}">Previous</a>`
  for(let i=1; i<=numberOfPages; i++ ) {
    const selectedClass = (i == currentPage) ? 'selected' : 'not-selected'
    html += `<a href="${baseURL}/${i}" class="page-link ${selectedClass}">${i}</a>`
  }
  const nextHtml = (currentPage + 1);
  const nextClass = (currentPage >= numberOfPages) ? 'hide' : 'show';
  html+= `<a href="${baseURL}/${nextHtml}" class="next ${nextClass}">Next</a>`
  html += '</div>'
  return html;
}

/* GET pagination page. */
router.get("/:pageNo", function (req, res, next) {
  const pageNumber = getCurrentPageNumber(req);
  const generatedMarkup = generatePagination(req, pageNumber);
  res.render("index", {
    title: `Pagination - Page ${pageNumber}`,
    markup: generatedMarkup,
  });
});

module.exports = router;
