 flowplayer.conf = {
   ratio: 5/12,
   // rtmp: "rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st"
   splash: false,
   analytics: "UA-73749016-1"
 };

var totalTime = 0;
var countDown;

 // bind listeners to all players on the page
 flowplayer(function(api, root) {
    var endTime = 0;
    var startingTime;
    api.on("load", function() {
      console.info("Your video is loading ...", api.engine.engineName);
    }).on("ready", function() {
      document.getElementById("time-spent").innerHTML = "To watch the whole video you'd need " + api.video.duration * 0.1 + " bitcoins";
      document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * 0.1 + " bitcoins on this video";
      startingTime = getStartTime("starting", totalTime);
    }).on("pause", function() {
      endTime = getEndTime("Resumed", startingTime);
    }).on("resume", function() {
      startingTime = getStartTime("resumed", totalTime);
    }).on("finished", function() {
      endTime = getEndTime("Finished", startingTime);
    });
 });

function getEndTime(displayStr, startingTime) {
  window.clearInterval(countDown);
  time = new Date().getTime() / 1000;
  console.info(displayStr, time);
  totalTime = totalTime + time - startingTime;
  console.info("Total time played: ", totalTime);
  return time;
}

function getStartTime(displayStr, totalTime) {
  var time = new Date().getTime() / 1000;
  console.info(displayStr, time);
  countDown = window.setInterval(function(){
    console.log("Another 5 seconds passed");
    totalTime += 5;
    document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * 0.1 + " bitcoins on this video";
  }, 5000);
  return time;
}