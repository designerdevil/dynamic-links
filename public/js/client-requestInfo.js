(function () {
    /**
     * RI CAPTCHA STARTS HERE
     */
    const riConfig = {
      captchaEl: "requestInfoCaptcha",
      captchaInputEl: "requestInfoCaptchaTextBox",
      modalWrapperEl: "requestInfoModalWrapper",
      modalEl: "request-info-modal",
      backdropEl: "request-info-modal-backdrop",
      formEl: "request-info-modal-form",
      listingIdEl: "hidden_ri_listing_id",
      closeRiModalEl: "close-ri-modal",
      requestInfoMessageEl: "requestInfoMessage",
      dropdownOrder: [
        "job_function",
        "job_title",
        "purchase_authority",
        "buying_cycle",
        "budget",
      ],
      fonts: ["Georgia", "Arial", "Times", "Garamond", "Trebuchet"],
      formPostPath: "/requestinfo",
      responseMessageDelay: 5000,
    };
    let riCaptchaCode;
    const getRandomFont = () => {
      const random = Math.floor(Math.random() * riConfig.fonts.length);
      return riConfig.fonts[random];
    };
    const createRequestInfoCaptcha = () => {
      const { captchaEl } = riConfig;
      //clear the contents of captcha div first
      document.getElementById(captchaEl).innerHTML = "";
      var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
      var lengthOtp = 6;
      var captcha = [];
      for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) === -1)
          captcha.push(charsArray[index]);
        else i--;
      }
      var canv = document.createElement("canvas");
      canv.id = "captcha";
      canv.width = 100;
      canv.height = 50;
      var ctx = canv.getContext("2d");
      ctx.font = `25px ${getRandomFont()}`;
      ctx.strokeText(captcha.join(""), 0, 30);
      //storing captcha so that can validate you can save it somewhere else according to your specific requirements
      riCaptchaCode = captcha.join("");
      document.getElementById(captchaEl).appendChild(canv); // adds the canvas to the body element
    };
  
    const validateCaptcha = () => {
      const captchaEl = document.getElementById(riConfig.captchaInputEl);
      if (captchaEl.value === riCaptchaCode) {
        captchaEl.classList.remove("error");
        return true;
      } else {
        captchaEl.classList.add("error");
        createRequestInfoCaptcha();
        return false;
      }
    };
  
    /**
     * RI CAPTCHA ENDS HERE
     */
  
    const validateForm = (formData) => {
      let isValidated = false;
      if (validateCaptcha()) {
        isValidated = true;
      }
      return isValidated;
    };
  
    // form submission
    const submitRiForm = (event) => {
      const { requestInfoMessageEl, responseMessageDelay } = riConfig;
      event.preventDefault();
      var formData = new FormData(event.target);
      if (!validateForm(formData)) return false;
  
      const setMessage = (msg) => {
        document.getElementById(requestInfoMessageEl).innerHTML = msg;
      };
      const removeMsg = () =>
        document
          .getElementById(requestInfoMessageEl)
          .classList.remove("show", "success", "error");
      const showMessage = (isSuccess) => {
        const el = document.getElementById(requestInfoMessageEl);
        removeMsg();
        if (isSuccess) {
          el.classList.add("success", "show");
        } else {
          el.classList.add("error", "show");
        }
      };
  
      fetch(riConfig.formPostPath, {
        body: formData,
        method: "post",
      })
        .then((response) => {
          //handle response
          // console.log('Response Data', response);
          return response.json();
        })
        .then((data) => {
          //handle data
          // console.log('Transformed Response Data', data);
          setMessage((data && data.message) || "Success");
          showMessage(data.success);
          setTimeout(removeMsg, responseMessageDelay);
        })
        .catch((error) => {
          //handle error
          console.log("Error Response", error);
          setMessage(`Error : ${error} `);
          showMessage(false);
          setTimeout(removeMsg, responseMessageDelay);
        });
      closeRiModal();
      //Dont submit the form.
      return false;
    };
  
    // fetching account data
    const generateAccountMarkup = () => {
      let markup = "";
      const accountObj = requestInfoData.accountInfo;
      if (accountObj) {
        markup += `<div class="display-name">${accountObj.display_name}</div>`;
        markup += `<div class="account-email">${accountObj.email}</div>`;
      }
      return markup;
    };
  
    // generating dropdown data
    const generateDropdowns = () => {
      const { dropdownPlaceholderText } = riConfig.riLabels;
      const generateDom = (ddObject, dropDownId) => {
        if (ddObject && ddObject.items && Array.isArray(ddObject.items)) {
          let dd = `
                      <div class="dropdown ${dropDownId}">
                      <label for="${dropDownId}">${ddObject.title}</label>
                      <select id="${dropDownId}" name="${dropDownId}" required>
                      <option value="">${dropdownPlaceholderText}</option>
                  `;
          ddObject.items.forEach(
            (item) =>
              (dd += `<option value="${item.value}">${item.text}</option>`)
          );
          dd += `</select></div>`;
          return dd;
        }
        return "";
      };
      let markup = "";
      riConfig.dropdownOrder.forEach((item) => {
        markup += generateDom(requestInfoData[item], item);
      });
      return markup;
    };
  
    // dom generation
    const generateMarkup = () => {
      const {
        captchaPlaceholder,
        closeModalLabel,
        submitLabel,
        textareaLabel,
        title,
      } = riConfig.riLabels;
      let markup = `
              <div class="request-info-modal-backdrop" id="${
                riConfig.backdropEl
              }"></div>
              <div class="request-info-modal" id="${riConfig.modalEl}">
                  <div class="title">${title}</div>
                  <div class="account-info">
                      ${generateAccountMarkup()}
                  </div>
                  <form id="${riConfig.formEl}">
                      <input type="hidden" id="hidden_ri_brand_id" name="brand_id" value="${
                        requestInfoData.brand_id
                      }" />
                      <input type="hidden" id="${
                        riConfig.listingIdEl
                      }"  name="listing_id" value="" />
                      <div class="form-data">
                          ${generateDropdowns()}
                      </div>
                      <div class="description-box">
                          <label for="ri-message">${textareaLabel}</label>
                          <textarea id="ri-message" name="message"></textarea>
                      </div>
                      <div class="captcha">
                          <div id="${riConfig.captchaEl}"></div>
                          <div id="enter-captcha">
                              <input type="text" placeholder="${captchaPlaceholder}" id="${
        riConfig.captchaInputEl
      }" />
                          </div>
                      </div>
                      <div class="cta">
                          <button type="submit">${submitLabel}</button>
                          <button type="button" id="${
                            riConfig.closeRiModalEl
                          }">${closeModalLabel}</button>
                      </div>
                  </form>
              </div>
          `;
      document.getElementById(riConfig.modalWrapperEl).innerHTML = markup;
    };
  
    // closing modal
    const closeRiModal = (element) => {
      if (element) {
        element.preventDefault();
      }
  
      const { modalEl, backdropEl, listingIdEl, formEl } = riConfig;
      document.getElementById(modalEl).classList.remove("show");
      document.getElementById(backdropEl).classList.remove("show");
      document.getElementById(listingIdEl).value = "";
      document.getElementById(formEl).reset();
    };
  
    // open modal
    const openRiModal = (element) => {
      element.preventDefault();
      const { modalEl, backdropEl, listingIdEl, requestInfoMessageEl } = riConfig;
      document.getElementById(modalEl).classList.add("show");
      document.getElementById(backdropEl).classList.add("show");
      document
        .getElementById(requestInfoMessageEl)
        .classList.remove("error", "success", "show");
      document.getElementById(listingIdEl).value =
        element.target.dataset.listingId;
      createRequestInfoCaptcha();
    };
  
    // binding events for request info elements
    const callBinding = () => {
      const { modalEl, backdropEl, closeRiModalEl } = riConfig;
      const links = document.querySelectorAll(`.listing-item`);
      links.forEach((element) => {
        element.addEventListener("click", openRiModal);
      });
      document
        .getElementById(closeRiModalEl)
        .addEventListener("click", closeRiModal);
      document.getElementById(backdropEl).addEventListener("click", closeRiModal);
      document.getElementById(modalEl).onsubmit = submitRiForm;
    };
  
    // attaching default labels
    const attachLabelToConfig = () => {
      riConfig.riLabels =
        document.getElementById(riConfig.modalWrapperEl).dataset || {};
    };
  
    // initialize requestInfo
    const init = () => {
      attachLabelToConfig();
      generateMarkup();
      callBinding();
      createRequestInfoCaptcha();
    };
    init();
  })();
  