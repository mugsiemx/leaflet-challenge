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
    // console.log(feature, layer),
        layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
    // layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: doOnEachFeature
  });
  // console.log(earthquakes);
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {
  var earthquakeMarkers = [];

  //   var geojsonMarkerOptions = {
//       radius: 8,
//       color: color,
//       weight: 1,
//       opacity: 1,
//       fillOpacity: 0.8
// };
  // function selectColor(); {
  //   var color = "";

  //   if {(depth > 9) {color = "Red"}};
  //   else if {(depth > 90) {color = "Red"}};
  //   else if {(depth > 70) {color = "Red"}};
  //   else if {(depth > 50) {color = "Red"}};
  //   else if {(depth > 30) {color = "Red"}};
  //   else if {(depth > 10) {color = "Red"}};
  //   else if {(depth > -10) {color = "Red"}};
  //   else {color = "Red"}};
  //   };
// Loop through locations, and create markers.
for (var i = 0; i < earthquakes.length; i++) {
  var depth = earthquakes[i].geometry.coordinates[2]
  console.log(depth)
  // Setting the marker radius for the earthquake location
  console.log(earthquakes[i].geometry)
  //  by passing the third coordinate into the markerSize function
  earthquakeMarkers.push(
    L.circle(earthquakes[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "",
      fillColor: "white",
      radius: markerSize(earthquakes[i].state.population),
    })
  );
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

