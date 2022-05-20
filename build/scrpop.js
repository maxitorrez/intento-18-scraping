function search() {
    let input = document.getElementById("input").value;
  
    let port = chrome.runtime.connect({ name: "safePortInput" });
  
    port.postMessage({ input });
  }
  
  let button = document.getElementById("button");
  
  button.addEventListener("click", search, false);
  