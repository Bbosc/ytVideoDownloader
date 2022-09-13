# ytVideoDownloader
First chrome extension for me, which add a button to the youtube control panel to allow a download of this video in .mp3 format by clicking on the added button.


A lot of garbage in the code for sure, as it is a first for me in JS or html. 
The basis is vastly inspired by : https://www.youtube.com/watch?v=0n809nd4Zu4&ab_channel=freeCodeCamp.org (at least the yt part). 

Basically, contentScript.js does the job for the yt part, and downloader.js does it for the youtube to mp3 part. Both scripts communicate with background.js to get the useful
intels like the video title/artist, etc.

