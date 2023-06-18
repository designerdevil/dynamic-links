(function () {
    const exhibitorLsKey = "selectedExhibitorFilters";
    const activeClass = "active";
  
    const getLs = () => {
      const lsValue = sessionStorage.getItem(exhibitorLsKey) || null;
      return (lsValue && JSON.parse(lsValue)) || [];
    };
  
    const setLS = (value = []) => {
      sessionStorage.setItem(exhibitorLsKey, JSON.stringify(value));
    };
  
    function handleFilterClick(event) {
      event.preventDefault();
      const eventTarget = event.target;
      const filterId = eventTarget.dataset.filterId;
      const isTargetActive = eventTarget.classList.contains(activeClass);
      let lsObj = getLs();
      if (!isTargetActive && filterId) {
        lsObj.push(filterId);
        eventTarget.classList.add(activeClass);
      }
      if (isTargetActive) {
        lsObj = [...lsObj.filter((item) => item !== filterId)];
        eventTarget.classList.remove(activeClass);
      }
      setLS(lsObj);
      if (window) {
        window.location.href = eventTarget.href;
      }
    }
  
    const init = () => {
      const links = document.querySelectorAll(".filter-item");
      links.forEach((element) => {
        // Apply classes on page load
        const localObj = getLs();
        const filterId = element.dataset.filterId;
        if (localObj.includes(filterId)) {
          element.classList.add(activeClass);
        }
        // Apply Event Handler on page load
        if (typeof window.addEventListener != "undefined") {
          element.addEventListener("click", handleFilterClick);
        } else {
          element.attachEvent("onclick", handleFilterClick);
        }
      });
    };
  
    init();
  })();
  