import { getActiveTabURL } from "./utils.js";


const classicButtonEventHandler = async () => {
  alert("downloading the classic way");
  chrome.runtime.sendMessage({
    origin: "popup",
    type: "classic",
    value: "https://myfreemp3juices.cc/",
  });

}

const exoticButtonEventHandler = async () => {
  const activeTab = await getActiveTabURL();
  alert("downloading the exotic way : " + activeTab.url);
  chrome.runtime.sendMessage({
    origin: "popup",
    type: "exotic",
    value: "https://notube.io/fr/youtube-app-v19",
  });
}


const setDownloadMode = () => {
  const classicButton = document.getElementsByClassName("btn btn-secondary")[0];
  const exoticButton  = document.getElementsByClassName("btn btn-secondary")[1];

  classicButton.addEventListener("click",classicButtonEventHandler);
  exoticButton.addEventListener("click",exoticButtonEventHandler);


}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    setDownloadMode();
  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
  }
});

