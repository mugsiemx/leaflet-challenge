// declare variables
var url = "data/all_week.geojson"

// get data with API call
// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // console.log(data.features)
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // console.log(earthquakeData);
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function doOnEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }


  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  function createCircleMarker(feature, latlng) {
    var circleOptions = {
        radius: feature.properties.mag * 3,
        color: color,
        fillColor: color,
        weight: 1,
        opacity: .8,
        fillOpacity: .25
    }
  }
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: doOnEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}
  // change color based on earthquake magnitude
  function getStyle(feature) {
    var depth = feature.geometry.coordinates[2]  
    var magnitude = feature.properties.mag 
    var color = "";
    // then passing the depth into the circle color function
    if (depth > 90) {color = "Red"}
      else if (depth > 70) {color == "Orange"}
      else if (depth > 50) {color == "Salmon"}
      else if (depth > 30) {color == "PaleGoldenRod"}
      else if (depth > 10) {color == "GreenYellow"}
      else if (depth > -10) {color == "LawnGreen"}
      else {color == "LightGreen"}
  
    return {
        color: color,
        fillColor: color,
        fillOpacity: 1,
        // radius: feature.geometry.coordinates[2]
        radius: magnitude * 3,

    }
  }

  // Add legend
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
      '<i style="background:' + getStyle(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap)


// create map
function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    // "Topographic Map": topo
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
    zoom: 2,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
