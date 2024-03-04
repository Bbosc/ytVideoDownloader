

browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "damn it"){
    waitForElm("#url").then((elm) => {elm.value = msg.value});
    // const entryText = document.querySelector("#url");
    // entryText.value = msg.value;
    const convertSelector = "body > form:nth-child(4) > div:nth-child(2) > input:nth-child(2)" 
    const downloadSelector = "body > form:nth-child(4) > div:nth-child(2) > a:nth-child(1)"
    // click to convert
    waitForElm(convertSelector).then((elm) => {
      elm.click();
    });
    // click to download
    waitForElm(downloadSelector).then((elm) =>{
      elm.click();
      setTimeout(() => { location.reload(); }, 1000);
    });
    
  } else {
    let images = document.URL;
    browser.runtime.sendMessage({text: "images",value:images});
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