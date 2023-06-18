var express = require("express");
var router = express.Router();

const generateRequestInfoConfig = () => {
  return `
    <script type="text/javascript">
      const requestInfoData = {
          accountInfo: {email: "gaurav.mall@informa.com", display_name: "Gaurav Mall"},
          brand_id:"197156",
          job_function: {title: "Job Function", items: [{value: "JF1", text: "Jobfunction 1"}, {value: "JF2", text: "Jobfunction 2"}]},
          job_title: {title: "Job Title", items: [{value: "JT1", text: "JobTitle 1"}, {value: "JT2", text: "JobTitle 2"}, {value: "JT3", text: "JobTitle 3"}]},
          purchase_authority: {title: "Purchase Authority", items: [{value: "PA1", text: "Purchase Authority 1"}, {value: "PA2", text: "Purchase Authority 2"}]},
          buying_cycle: {title: "Buying Cycle", items: [{value: "BC1", text: "BuyingCycle 1"}, {value: "BC2", text: "BuyingCycle 2"}, {value: "BC3", text: "BuyingCycle 3"}]},
          budget: {title: "Budget", items: [{value: "B1", text: "Budget 1"},{value: "B2", text: "Budget 2"},{value: "B3", text: "Budget 3"},{value: "B4", text: "Budget 4"}]}
      }
    </script>
  `;
};

const filterMarkup = (page) => {
  return `
    <ul>
    <li><a class="listing-item" href="/requestinfo" data-listing-id="1">listing Id 1</a></li>
    <li><a class="listing-item" href="/requestinfo" data-listing-id="2">listing Id 2</a></li>
    <li><a class="listing-item" href="/requestinfo" data-listing-id="3">listing Id 3</a></li>
    <li><a class="listing-item" href="/requestinfo" data-listing-id="4">listing Id 4</a></li>
    <li><a class="listing-item" href="/requestinfo" data-listing-id="5">listing Id 5</a></li>
    </ul>
  `;
};

router.post("/", function (req, res, next) {
  res.send({ success: true, message: "Form Posted Successfully" });
});

router.get("/", function (req, res, next) {
  const generatedMarkup = `
    ${generateRequestInfoConfig()}
    ${filterMarkup("page1")}
    <div id="requestInfoMessage" class="request-info-message"></div>
    <div 
      class="modal-wrapper"
      id="requestInfoModalWrapper"
      data-dropdown-placeholder-text="Please choose a value"
      data-title="Request Info"
      data-submit-label="Submit"
      data-close-modal-label="Close"
      data-textarea-label="Close"
      data-captcha-placeholder="Enter captcha here"
    >
    </div>
  `;
  res.render("index", {
    title: "Request info modal",
    markup: generatedMarkup,
  });
});

module.exports = router;
