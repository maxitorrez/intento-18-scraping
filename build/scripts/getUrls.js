(() => {
    // src/functions/autoscrolling.js
    var autoscrolling = (pixels) => new Promise((resolve, reject) => {
      let pixelstoScroll = pixels;
      console.log(pixelstoScroll);
      const idInterval = setInterval(() => {
        window.scrollTo(0, pixelstoScroll);
        pixelstoScroll += pixels;
        if (pixelstoScroll > document.body.scrollHeight) {
          clearInterval(idInterval);
          resolve(true);
        }
      }, 100);
    });
    var autoscrolling_default = autoscrolling;
  
    // src/functions/selector.js
    var $ = (selector, node = document) => node.querySelector(selector);
    var $$ = (selector, node = document) => [...node.querySelectorAll(selector)];
  
    // src/functions/waitForElement.js
    var waitForElement = (selector) => new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!$(selector).element) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
      setTimeout(() => {
        reject();
      }, 1e4);
    });
    var waitForElement_default = waitForElement;
  
    // src/scripts/selectors.js
    var SELECTORS = {
      profile: {
        css: {
          fullname: "h1"
        },
        xpath: {
          educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[1]/li",
          experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
        }
      },
      search: {
        urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
      }
    };
    var selectors_default = SELECTORS;
  
    // src/scripts/getUrls.js
    waitForElement_default("h1").then(() => {
      autoscrolling_default(30).then(() => {
        const urlsProfiles = $$(selectors_default.search.urlsProfiles).map((element) => element.href.split("?")[0]);
        let port = chrome.runtime.connect({ name: "safePortUrls" });
        port.postMessage({ urlsProfiles });
      });
    }).catch(() => {
      console.log("intentelo mas tarde");
    });
  })();
  