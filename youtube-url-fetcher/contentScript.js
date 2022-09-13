(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentUrl ;
  let videoTitle = "";


  function getCurrentURL () {
    return window.location.href
  };


  const addNewDownloadEventHandler = async () => {
    currentUrl = getCurrentURL();

    const container = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];
    const title = container.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].textContent;
    videoTitle = title;

    // sending the title to background.js
    chrome.runtime.sendMessage({
      origin : "contentscript",
      videoToDownload : title})

  };

  const newVideoLoaded = async () => {
    const downloadBtnExists = document.getElementsByClassName("download-btn")[0];

    if (!downloadBtnExists) {
      const downloadBtn = document.createElement("img");

      downloadBtn.src = chrome.runtime.getURL("assets/download.png");
      downloadBtn.className = "ytp-button " + "download-btn";
      downloadBtn.title = "Click to add current video to downloading list";

      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName('video-stream')[0];

      youtubeLeftControls.appendChild(downloadBtn);
      downloadBtn.addEventListener("click", addNewDownloadEventHandler);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, videoId, currentUrl } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
    if (type === "DOWNLOAD"){
      console.log("sending download intel : ", videoId);
    }
  });

})();
