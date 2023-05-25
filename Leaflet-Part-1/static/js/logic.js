// declare variables
var url = 'data/all_week.geojson'

// // Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Create functions
// create circle markers 
function style(feature, latlng){
  return {
    // higher magnitudes, bigger circles
    radius:feature.properties.mag * 3,
    fillColor: chooseColor(feature.geometry.coordinates[2]),
    color: chooseColor(feature.geometry.coordinates[2]),
    weight: 1,
    opacity: .8,
    fillOpacity: 0.35
  };
}



// --------------------
// Create a GeoJSON layer that contains the features array on the earthquakeData object.
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
    style: style,
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



//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   var myMap = L.map('map', {
//     center: [38.5733, -109.5498], zoom: 10});
//     // layers: [street, earthquakes]


// var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// var titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// var magnitude
// var depth

// // Create the base layers.
// var street = L.tileLayer(titleUrl, {attribution});
// street.addTo(myMap);

// // Create the circle layer Moab, UT
// var circleLayer = L.circle([38.5733, -109.5498], 
//                     {radius: 200, color: 'red'})
// circleLayer.addTo(myMap);






// // // Create a GeoJSON layer that contains the features array on the earthquakeData object.
// // function createCircleMarker(feature, latlng){
// //   let circleOptions = {
// //     // higher magnitudes, bigger circles
// //     radius:feature.properties.mag * 3,
// //     fillColor: chooseColor(feature.geometry.coordinates[2]),
// //     color: chooseColor(feature.geometry.coordinates[2]),
// //     weight: 1,
// //     opacity: .8,
// //     fillOpacity: 0.35
// // }





// //   // Create an overlay object to hold our overlay.
// //   var overlayMaps = {Earthquakes: earthquakes};

// //   // Create our map, giving it the streetmap and earthquakes layers to display on load.
// //   var myMap = L.map('map', {
// //     center: [
// //       37.09, -95.71
// //     ],
// //     zoom: 3,
// //     layers: [street, earthquakes]
// //   });


// // return L.circleMarker(latlng, circleOptions);
// // }

// // // change the color based on feature's mag
// // function chooseColor(magnitude) {
// //   var color = "";
// //   // then passing the depth into the circle color function, deeper = darker color
// //   if (depth > 90) {color = "Red"}
// //     else if (depth > 70) {color == "Orange"}
// //     else if (depth > 50) {color == "Salmon"}
// //     else if (depth > 30) {color == "PaleGoldenRod"}
// //     else if (depth > 10) {color == "GreenYellow"}
// //     else if (depth > -10) {color == "LawnGreen"}
// //     else {color == "LightGreen"}

// //     return {
// //       color
// //   }
// // }

// // // get data with API call
// // // Perform a GET request to the query URL/
// // d3.json(url).then(function (data) {
// //   // Once we get a response, send the data.features object to the createFeatures function.
// //   // console.log(data.features)
// //   createFeatures(data.features);
// // });

// // function createFeatures(earthquakeData) {
// //   console.log(earthquakeData);
// //   // Define a function that we want to run once for each feature in the features array.
// //   // Give each feature a popup that describes the place, time, and magnitude of the earthquake.
 


// //   // Run the onEachFeature function once for each piece of data in the array.
// //   //parsing the data and has default features we can use for further processing.
// //   var earthquakes = L.geoJSON(earthquakeData, {

// //     pointToLayer: function(feature, latlng) {
// //         return new L.circleMarker(latlng, {
// //           radius:feature.properties.mag * 3,
// //           fillColor: chooseColor(feature.geometry.coordinates[2]),
// //           color: chooseColor(feature.geometry.coordinates[2]),
// //           weight: 1,
// //           opacity: .8,
// //           fillOpacity: 0.35
// //         });
// //     onEachFeature:  function (feature, layer) {
// //       layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><p>${new Date(feature.properties.time)}</p><br><h3>Magnitude of ${feature.properties.mag}</h3>`);
// //     }
// //   },

// //   });

// //   // Send our earthquakes layer to the createMap function/
// //   createMap(earthquakes);
// // }

// // function createMap(earthquakes) {



// //   // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// //   //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// //   // });

// //   // Create a baseMaps object.
// //   var baseMaps = {
// //     "Street Map": street,
// //     // "Topographic Map": topo
// //   };

// //   // Create an overlay object to hold our overlay.
// //   var overlayMaps = {
// //     Earthquakes: earthquakes
// //   };

// //   // Create our map, giving it the streetmap and earthquakes layers to display on load.
// //   var myMap = L.map("map", {
// //     center: [
// //       37.09, -95.71
// //     ],
// //     zoom: 3,
// //     layers: [street, earthquakes]
// //   });

// //   // Create a layer control.
// //   // Pass it our baseMaps and overlayMaps.
// //   // Add the layer control to the map.
// //   L.control.layers(baseMaps, overlayMaps, {
// //     collapsed: false
// //   }).addTo(myMap);

// // }
