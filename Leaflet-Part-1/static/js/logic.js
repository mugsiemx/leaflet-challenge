// New Visualization for USGS Earthquake Data
// Earthquakes for the last 7 days as of 4/8/2023 10:23 AM
// relied heavily on code from Activity: 10-Stu_GeoJson in the 15-Mapping, Day 1, Activities Folder

// declare variables
url = "data/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
  // create variable for the response, data.features object
  var earthquakeData = data.features
  createFeatures(earthquakeData);
});

function createFeatures(earthquakeData) {
  // console.log(earthquakeData);
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  
  
  
  function doOnEachFeature(feature, layer) {
    function circleMarkers(feature, latlng) {
        // get the third element in the coordinates array for radius calculation  
        var geometry = earthquakes[i].geometry;
        var geoLat = geometry.coordinates[1];
        var geoLng = geometry.coordinates[0];
        var geoDepth = geometry.coordinates[2];
        var depth = int(geoDepth) * 10;

        var geojsonMarkerOptions = {
            radius: depth,
            color: selectColor(depth),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    // console.log(feature, layer),
        layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
    // layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
  }};

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: doOnEachFeature,
    pointToLayer: circleMarkers
  });

  // console.log(earthquakes);
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}




function createMap(earthquakes) {
  var earthquakeMarkers = [];




  // Loop through the records, and create markers.
  for (var i = 0; i < earthquakes.length; i++) {

    // set up color change by clearing previous color
    var color = "";
    // then passing the third coordinate into the markerSize function
    if (depth > 90) {color = "Red"}
      else if (depth > 70) {color = "Red"}
      else if (depth > 50) {color = "Red"}
      else if (depth > 30) {color = "Red"}
      else if (depth > 10) {color = "Red"}
      else if (depth > -10) {color = "Red"}
      else {color = "Red"}
    
    //  by passing the third coordinate into the markerSize function
    // earthquakeMarkers.push(
    var circle = L.circle(geoLat, geoLng, {
      stroke: false,
      fillOpacity: 0.75,
      color: color,
      // fillColor: "white",
      radius: markerSize(depth),
    }).addTo(map);
    // );
  };
  // create the base layers
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });

  // create a baseMaps object
  var baseMaps = {
    "Street Map": street,
    // "Topographic Map": topo
  };

  // create an overlay object
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
  });

  // create a layer control with parameters baseMaps and overlayMaps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  // Add the layer control to the map.  
  }).addTo(myMap);

};

