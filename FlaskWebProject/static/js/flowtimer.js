 flowplayer.conf = {
   ratio: 5/12,
   // rtmp: "rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st"
   splash: true,
   analytics: "UA-73749016-1"
 };

 // bind listeners to all players on the page
 flowplayer(function(api, root) {
    var totalTime = 0;
    var endTime = 0;
    var startingTime;
       // when a new video is about to be loaded
    api.on("load", function() {
       console.info("load", api.engine.engineName);
       // when a video is loaded and ready to play
    }).on("ready", function() {
       console.info("ready", api.video.duration)
       startingTime = new Date().getTime() / 1000;
       console.info("starting", startingTime)
    }).on("pause", function() {
       var endTime = new Date().getTime() / 1000;
       console.info("end", endTime)
       console.info(endTime - startingTime);
       totalTime = totalTime + endTime - startingTime;
       console.info("Total time played: ", totalTime);
    }).on("resume", function() {
       startingTime = new Date().getTime() / 1000;
       console.info("resumed", startingTime)
    }).on("finished", function() {
       endTime = new Date().getTime() / 1000;
       console.info("finished", startingTime)
       console.info("time played this time", endTime - startingTime);
       totalTime = totalTime + endTime - startingTime;
       console.info("Total time played: ", totalTime);
    });
 });