import autoscrolling from "../functions/autoscrolling.js";
import { $, $x } from "../functions/selector.js";
import waitForElement from "../functions/waitForElement.js";
import SELECTORS from "./selectors.js";

waitForElement('h1')
   .then(()=>{
      autoscrolling(30).then(()=>{
         const fullName = $(SELECTORS.profile.css.fullname).textContent
         const experienceItems = $x(SELECTORS.profile.xpath.experiencieItems)
         const educationItems = $x(SELECTORS.profile.xpath.educationItems)
         
         const pruebaExperience = experienceItems
                                    .map(element => $('span[aria-hidden="true"]',element)?.textContent);
         
         
         const pruebaEducation = educationItems
                                    .map(element=> $('span[aria-hidden="true"]',element)?.textContent)

         let port = chrome.runtime.connect({name:"safePort"})
         port.postMessage({fullName,pruebaExperience, pruebaEducation})

      })
   })
   .catch(()=>{console.log("intentelo mas tarde")})
