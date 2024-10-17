/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
let map;
var source = new EventSource("http://192.168.46.30:5000/listen");
// const sosAudio = document.getElementById("sosAudio");
source.onmessage = function(event) {
  console.log('hello');
  console.log(event.data);
  document.getElementById("alertBox").style.display = "inline-flex";

  document.getElementById("alert-link").href = "wallet.html?latitude=" + event.data.split("-")[0] + "&longitude=" + event.data.split("-")[1];
  sosAudio.play();
};
// sosAudio.addEventListener('hover', () => {
//   const audio = document.getElementById('sosAudio');
//   audio.muted = false;  // Unmute after the page has loaded
//   audio.play();  // Try to play the audio
// });

// Observe changes in the style attribute of the alertBox
// playAudioOnDisplay.observe(alertBox, { attributes: true, attributeFilter: ["style"] });
async function initMap() {
  // The location of Uluru
  // 26.77572649228634, 75.87610610000003
  const position = { lat: 26.91562260075454, lng:  75.793055132018 };
  const position1 = { lat: 26.933390824294126, lng:  75.74759017711575 };
  const position2 = { lat: 26.856682256527325, lng:  75.78952098139501 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("map"), {
    zoom:11.9,
    center: position1,
    mapId: "DEMO_MAP_ID",
  });
  
  const circleMarker = document.createElement('img')
  circleMarker.src = "map_marker.png"
  const circleBackground = document.createElement("img");
  circleBackground.style.opacity = .8
  circleBackground.src = "map_marker_background.png"
  const marker1 = new AdvancedMarkerElement({
    map: map,
    position: position1,
    title: "danger",
    content: circleBackground
    
  });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: position1,
    title: "danger",
    content: circleMarker 
    
  });
  // const marker3 = new AdvancedMarkerElement({
  //   map: map,
  //   position: position2,
  //   title: "danger",
  //   content: circleBackground
    
  // });
  // const marker4= new AdvancedMarkerElement({
  //   map: map,
  //   position: position2,
  //   title: "danger",
  //   content: circleMarker 
    
  // });
}

initMap();
