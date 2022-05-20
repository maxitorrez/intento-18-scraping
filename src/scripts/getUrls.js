import autoscrolling from "../functions/autoscrolling.js"
import { $$ } from "../functions/selector.js"
import waitForElement from "../functions/waitForElement.js"
import SELECTORS from "./selectors.js"

waitForElement("h1")
    .then(()=>{
        autoscrolling(30).then(()=>{
            const urlsProfiles = $$(SELECTORS.search.urlsProfiles).map(element=>element.href.split("?")[0])
            
            let port = chrome.runtime.connect({name:"safePortUrls"})
            port.postMessage({urlsProfiles})

        })
    })
    .catch(()=>{console.log("intentelo mas tarde")})
