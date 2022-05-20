import URLS from "./config.js";
import { db } from "./lib/db.js";

let tabId;
let guardian = 0;
let urls;

chrome.runtime.onConnect.addListener((port) => {
 

  if (port.name === "safePortInput") {
    port.onMessage.addListener((message) => {
      chrome.tabs.create(
        {
          url: URLS.base + message.input,
        },
        (tab) => {
          tabId = tab.id;
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["./scripts/getUrls.js"],
          });
        }
      );
    });
  } else if (port.name === "safePort") {
    port.onMessage.addListener(async (message) => {
   

      await db.profiles.add(message.profile);

      console.log("datos guardados en indexdb");

    

      if (guardian < urls?.length) {
        await chrome.tabs.update(tabId, { url: urls[guardian] });
        setTimeout(() => {
 
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["./scripts/scrapper.js"],
          });
        }, 8000);

        guardian++;
      }
    });
  } else if (port.name === "safePortUrls") {
    port.onMessage.addListener(async (message) => {
      urls = message.urlsProfiles;
 
      const [url] = urls;
      await chrome.tabs.update(tabId, { url });
      setTimeout(() => {
        console.log("set time out");
        chrome.scripting.executeScript({
          target: { tabId },
          files: ["./scripts/scrapper.js"],
        });
      }, 8000);
      guardian++;
    });
  }
});
