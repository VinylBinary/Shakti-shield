/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
let map;
async function initMap() {
  // The location of Uluru
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const latitude = urlParams.get('latitude')
  const longitude = urlParams.get('longitude')
  const position = { lat: Number(latitude), lng: Number(longitude) };
  console.log(position);
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("map"), {
    zoom:14,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const circleMarker = document.createElement('img')
  circleMarker.src = "map_marker.png"
  const circleBackground = document.createElement("img");
  circleBackground.style.opacity = .8
  circleBackground.src = "map_marker_background.png"
  // const marker1 = new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "danger",
  //   content: circleBackground
    
  // });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "danger",
    content: circleMarker 
    
  });
}

initMap();
