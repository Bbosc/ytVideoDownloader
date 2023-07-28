var link;
const downloaderUrl = "https://ytmp3.nu/en9/";

function processTabs(){
  browser.tabs.query({},
    (tabs)=>tabs.map(Process))
}

function Process(tab){
  console.log(tab.url);
  if (tab.url.includes("ytmp3")) {
    browser.tabs.sendMessage(tab.id,{text: "damn it",value: link});
  }
}


browser.browserAction.onClicked.addListener(function (tab) {
  browser.tabs.sendMessage(
      tab.id,
      { text: 'sharePage', value: link}
  );
  
});


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "images"){
    link = msg.value;
  }
  processTabs();
});

