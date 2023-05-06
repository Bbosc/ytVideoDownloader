

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "damn it"){
    waitForElm("#url").then((elm) => {elm.value = msg.value});
    // const entryText = document.querySelector("#url");
    // entryText.value = msg.value;
   
    // click to convert
    waitForElm("body > form > div:nth-child(2) > input:nth-child(3)").then((elm) => {
      elm.click();
    });
    // click to download
    waitForElm("#download > a:nth-child(1)").then((elm) =>{
      elm.click();
      setTimeout(() => { window.location.reload(); }, 1000);
    });
    
  } else {
    let images = document.URL;
    chrome.runtime.sendMessage({text: "images",value:images});
  }
    
});

function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(_ => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}