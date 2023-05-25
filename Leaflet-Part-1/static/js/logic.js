// declare variables
var url = 'data/all_week.geojson'

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// var circleMarker = L.circleMarker([row.countryInfo.lat, row.countryInfo.long],
//     {color:'red',opacity:0.3,weight:1, fillColor: 'red',fillOpacity:.3, radius: rad})
//     .bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
//      .addTo(map);
// // // change the color based on feature's mag
// function chooseColor(magnitude) {
//   var color = "";
//   // then passing the depth into the circle color function, deeper = darker color
//   if (depth > 90) {color = "Red"}
//     else if (depth > 70) {color == "Orange"}
//     else if (depth > 50) {color == "Salmon"}
//     else if (depth > 30) {color == "PaleGoldenRod"}
//     else if (depth > 10) {color == "GreenYellow"}
//     else if (depth > -10) {color == "LawnGreen"}
//     else {color == "LightGreen"}

//     return {
//       color
//   }
// }

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // console.log(data.features)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function doOnEachFeature(feature, layer) {


    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: 5,
        // higher magnitudes, bigger circles
        radius:feature.properties.mag * 3,
        fillColor: 'red', //chooseColor(feature.geometry.coordinates[2]),
        color: 'red', //chooseColor(feature.geometry.coordinates[2]),
        weight: 1,
        opacity: .8,
        fillOpacity: 0.35
      });
    },
    onEachFeature: doOnEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

