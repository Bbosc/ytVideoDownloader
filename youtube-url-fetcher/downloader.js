(() => {

  let videoTitle = "";
  let downloadLink ;
  let addInfo ;

  //initiate connection with background at loading.
  window.addEventListener('load', function () {
    chrome.runtime.sendMessage({
      origin : "downloader",
      videoToDownload: "surprise"
    });
    
  })

  function gettingDownloadLink(){
    
    downloadLink = document.getElementsByClassName("list-group")[0].getElementsByTagName("a").item('4').href;
    addInfo = document.getElementsByClassName("list-group")[0].getElementsByClassName("dropdown-menu")[0].getElementsByTagName("li")[1].textContent;
    window.open(downloadLink);

  }

  const searchForDownload = async () => {

    document.getElementById("query").value = videoTitle;
    document.getElementsByClassName("btn btn-primary search")[0].click();
    //giving some time to load the results
    setTimeout(() => {gettingDownloadLink();},2000);
 
  }


  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, videoId, currentUrl } = obj;

    if (type === "DOWNLOAD") {
      videoTitle = videoId;
      searchForDownload();
    }
  });

})();