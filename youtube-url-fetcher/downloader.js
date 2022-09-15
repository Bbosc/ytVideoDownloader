(() => {

  let videoTitle = "";
  let duration = "";
  let downloadLink ;
  let channel ;

  //initiate connection with background at loading.
  window.addEventListener('load', function () {
    chrome.runtime.sendMessage({
      origin : "downloader",
      videoToDownload: "surprise",
      videoDuration: ""
    });
    
  })

  function convertToSeconds(){
    const splited = duration.split(":");
    return splited[0]*60 + parseInt(splited[1]);
  }

  //to download the best choice, let's consider that the best one is the link whose video has the closest duration from the original.

  function bestChoice(){

    let baseDuration = convertToSeconds();

    let container = document.getElementsByClassName("list-group")[0].getElementsByClassName("btn-group pull-right badge-download");
    let listOfDurations = Array(container.length);
    for (let i = 0; i< container.length; i++){
      listOfDurations[i] = Math.abs(parseInt(container[i].getElementsByTagName("a").item('1').getAttribute("data-duration")) - baseDuration);

    }
    const min = Math.min.apply(Math,listOfDurations);
    const index = listOfDurations.indexOf(min);
    return index;

  }

  function gettingDownloadLink(){

    const bestIndex = bestChoice();
    
    downloadLink = document.getElementsByClassName("list-group")[0].getElementsByClassName('name')[bestIndex].href;
    window.open(downloadLink);

  }

  const searchForDownload = async () => {

    document.getElementById("query").value = videoTitle + " " + channel;
    document.getElementsByClassName("btn btn-primary search")[0].click();
    //giving some time to load the results
    setTimeout(() => {gettingDownloadLink();},1000);
 
  }


  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, videoId, videoDuration, channelName, currentUrl } = obj;

    if (type === "DOWNLOAD") {
      videoTitle = videoId;
      duration = videoDuration;
      channel = channelName;

      searchForDownload();
    }
  });

})();