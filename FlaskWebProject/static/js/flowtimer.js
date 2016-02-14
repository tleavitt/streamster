var myVar = loadScript("https://cdn.firebase.com/js/client/2.2.1/firebase.js", updateDB);

function loadScript(url, updateDB) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = updateDB;
    script.onload = updateDB;

    // Fire the loading
    head.appendChild(script);
}

// function urlParam(name){
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (results==null){
//        return null;
//     }
//     else{
//        return results[1] || 0;
//     }
// }

flowplayer.conf = {
   ratio: 5/12,
   // rtmp: "rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st"
   splash: false,
   analytics: "UA-73749016-1"
};

var totalTime = 0;
var countDown;
var COST_PER_SECOND = 0.01;

function updateDB() {
  // var dbRef = new Firebase('https://streamster.firebaseio.com/');

 //bind listeners to all players on the page
  flowplayer(function(api, root) {
    // var key = urlParam('key');
    // var videoName = document.getElementsByClassName("flowplayer")[0].getAttribute("title");
    // var child = {type: "video", name:videoName, views:1};
    // dbRef.push(child);

    // var key = urlParam('key');
    // console.log(key);
    // var url = "https://streamster.firebaseio.com/" + key + "/views";
    // console.log(url);
    // var thisView = new Firebase(url);
    // thisView.transaction(function(current) {
    //   return current+1;
    // });
    // var child = {type: "video", name:videoName, views:1};
    // dbRef.push(child);
    // dbRef.on("value", function(snapshot) {
    //     var db = snapshot.val();
    //     var videoKey;
    //     for (var key in db) {        
    //       if (!db[key].hasOwnProperty('img-url')) {
    //         if(db[key]['name'] === videoName) {
    //           videoKey = key;
    //           document.getElementById("info").innerHTML = "" + db[key]['name'] + " - Views: " + db[key]['views'];
    //         }
    //       }
    //     }
    //     var url = "https://streamster.firebaseio.com/" + videoKey + "/views";
    //     console.log(url);
    //     var thisView = new Firebase(url);
    //     thisView.transaction(function(current) {
    //       return current+1;
    //     });
    // });
    console.log("here");
    var endTime = 0;
    var startingTime;
    api.on("load", function() {
      console.info("Your video is loading ...", api.engine.engineName);
    }).on("ready", function() {
      document.getElementById("time-spent").innerHTML = "To watch the whole video you'd need " + api.video.duration * COST_PER_SECOND + " bitcoins";
      document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * COST_PER_SECOND + " bitcoins on this video";
      if (api.playing == true)
        startingTime = getStartTime("starting", totalTime);
    }).on("pause", function() {
      endTime = getEndTime("Resumed", startingTime);
    }).on("resume", function() {
      if (api.playing == true)
        startingTime = getStartTime("resumed", totalTime);
    }).on("finished", function() {
      endTime = getEndTime("Finished", startingTime);
    });
 });

//  function getValue(dbRef, videoName) {
//   dbRef.on("value", function(snapshot) {
//     results_list = "";
//     // results_list = document.getElementById("results-list");
//     var db = snapshot.val()
//     console.log(db);
//     for (var key in db) {
//       // if (!db.hasOwnProperty(key)) continue;
//       if (!db[key].hasOwnProperty('img-url')) {
//         if(db[key]['name'] === videoName) {
//           console.log(db[key]);
//           console.log(videoName);
//           console.log("found");
//           return db[key];
//         }
//       }
//     }
//   });
//   return null;
// }

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
    console.log("Another second passed");
    totalTime += 1;
    document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * COST_PER_SECOND + " bitcoins on this video";
  }, 1000);
  return time;
}

}

 // bind listeners to all players on the page
 // flowplayer(function(api, root) {
 //    dbRef.push({type: "video", name:"Jelly Fight", views:1});
 //    dbRef.push({type: "video", name:"Stressed Out", views:1});
 //    dbRef.on("value", function(snapshot) {
 //      console.log(snapshot.val());
 //    }, function (errorObject) {
 //      console.log("The read failed: " + errorObject.code);
 //    });
 //    var endTime = 0;
 //    var startingTime;
 //    api.on("load", function() {
 //      console.info("Your video is loading ...", api.engine.engineName);
 //    }).on("ready", function() {
 //      document.getElementById("time-spent").innerHTML = "To watch the whole video you'd need " + api.video.duration * COST_PER_SECOND + " bitcoins";
 //      document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * COST_PER_SECOND + " bitcoins on this video";
 //      if (api.playing == true)
 //        startingTime = getStartTime("starting", totalTime);
 //    }).on("pause", function() {
 //      endTime = getEndTime("Resumed", startingTime);
 //    }).on("resume", function() {
 //      if (api.playing == true)
 //        startingTime = getStartTime("resumed", totalTime);
 //    }).on("finished", function() {
 //      endTime = getEndTime("Finished", startingTime);
 //    });
 // });

// function getEndTime(displayStr, startingTime) {
//   window.clearInterval(countDown);
//   time = new Date().getTime() / 1000;
//   console.info(displayStr, time);
//   totalTime = totalTime + time - startingTime;
//   console.info("Total time played: ", totalTime);
//   return time;
// }

// function getStartTime(displayStr, totalTime) {
//   var time = new Date().getTime() / 1000;
//   console.info(displayStr, time);
//   countDown = window.setInterval(function(){
//     console.log("Another second passed");
//     totalTime += 1;
//     document.getElementById("current-time-spent").innerHTML = "You have spent " + totalTime * COST_PER_SECOND + " bitcoins on this video";
//   }, 1000);
//   return time;
// }