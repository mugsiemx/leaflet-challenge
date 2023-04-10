// New Visualization for USGS Earthquake Data
// Earthquakes for the last 7 days as of 4/8/2023 10:23 AM
// Code from Activity: 10-Stu_GeoJson in the 15-Mapping, Day 1, Activities Folder

// declare variables
url = "data/all_week.geojson"

//define functions changing defaults
  // change color function for third coordinate (depth)
function selectColor(depth) {
  // set up color change by clearing previous color
  var color = "";
  // then passing the depth into the circle color function
  if (depth > 90) {color = "Red"}
    else if (depth > 70) {color = "Orange"}
    else if (depth > 50) {color = "Salmon"}
    else if (depth > 30) {color = "PaleGoldenRod"}
    else if (depth > 10) {color = "GreenYellow"}
    else if (depth > -10) {color = "LawnGreen"}
    else {color = "Gold"}
};
  // change the circle sizes based on size of earthquake
function sizeChange(mag) {
  
}

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
  // create variable for the response, data.features object
  var earthquakeData = data.features
  createFeatures(earthquakeData);
});

function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
    
  function doOnEachFeature(feature, layer) {
      
    // console.log(feature, layer),
    layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: doOnEachFeature
  });
  // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
}

function createMap(earthquakes) {
  // var earthquakeMarkers = [];

  // create the base layers
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });
  // Create a separate layer group: new circle markers
  // Loop through the cities array, and create one marker for each city object.
  for (var i = 0; i < earthquakes.length; i++) {
    L.circle(earthquakes[i].geometry.coordinates[0], {
      fillOpacity: 0.75,
      color: ,
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(cities[i].population)
    }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }





  var circle = L.layerGroup(circleMarkers);

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

}
