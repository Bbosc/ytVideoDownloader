
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && ((tab.url.includes("youtube.com/watch")) || (tab.url.includes("myfreemp3")))) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
      currentUrl: tab.url,
    });
  }
});

var videoTitle;
var videoDuration;

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  console.log(request.videoToDownload);
  // receiving the title of the video to download from contentScript.js
  if (request.origin === "downloader"){
    console.log("sended by downloader.js");
  } else if (request.origin === "contentscript"){
    chrome.windows.create({url:"https://myfreemp3juices.cc/", state:"minimized", focused: false});
    videoTitle = request.videoToDownload;
    duration = request.videoDuration;
  }

  chrome.tabs.sendMessage(sender.tab.id, {
    type: "DOWNLOAD",
    videoId: videoTitle,
    videoDuration: duration,
    currentUrl: "",
  });
  
});

