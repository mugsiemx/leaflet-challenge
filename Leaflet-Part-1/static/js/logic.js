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
    else if (depth > 70) {color == "Orange"}
    else if (depth > 50) {color == "Salmon"}
    else if (depth > 30) {color == "PaleGoldenRod"}
    else if (depth > 10) {color == "GreenYellow"}
    else if (depth > -10) {color == "LawnGreen"}
    else {color == "Gold"}
  return color
};

// A function to determine the marker size based on magnitude of earthquake
function markerSize(magnitude) {
  return Math.sqrt(magnitude) * 50;
}


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
    
  function OnEachFeature(feature, layer) {
      
    // console.log(feature, layer),
    layer.bindPopup(`<h1>${feature.properties.place}</h1><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  var earthquakes = L.geoJSON(earthquakeData).addTo(map);

  // // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // // Run the onEachFeature function once for each piece of data in the array.
  // //parsing the data and has default features we can use for further processing.
  // var earthquakes = L.geoJSON(earthquakeData, {
  //   style: function(feature) {
  //     return {
  //       color: "green"
  //     };
  //   },

  //   pointToLayer: function(feature, latlng) {
  //     return new L.CircleMarker(latlng, {
  //       radius: 10,
  //       fillOpacity: 0.85
  //     });
  //   },
  //   onEachFeature: function (feature, layer) {
  //     layer.bindPopup(feature.properties.place);
  //   }

  //   //   var geojsonMarkerOptions = {
  //   //     color: color,
  //   //     weight: 1,
  //   //     opacity: 1,
  //   //     fillOpacity: 0.8,
  //   //     radius: size(feature.properties.mag)
  //   // }
  //   //   return L.circle(coordinates, geojsonMarkerOptions)
  //   // }
  // });
  // map.addLayer(earthquakes);
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // console.log(earthquakes);
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


    var location = [earthquakes[i].geometry.coordinates[1],
                    earthquakes[i].geometry.coordinates[0]]
    L.circle(location, {
      fillOpacity: 0.75,
      color: selectColor(earthquakes[i].geometry.coordinates[2]),
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to the earthquake magnitidue
      radius: markerSize(earthquakes.properties.mag),

    }).bindPopup(`<h1>${earthquakes[i].coordinates}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }
  // create legend
  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['-10-10', ],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);
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
