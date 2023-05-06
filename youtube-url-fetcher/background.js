var link;
const downloaderUrl = "https://ytmp3.nu/en9/";

function processTabs(){
  chrome.tabs.query({},
    (tabs)=>tabs.map(Process))
}

function Process(tab){
  console.log(tab.url);
  if (tab.url.includes("ytmp3")) {
    chrome.tabs.sendMessage(tab.id,{text: "damn it",value: link});
  }
}


chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(
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

