// declare variables
var url = 'data/all_week.geojson'

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// var circleMarker = L.circleMarker([row.countryInfo.lat, row.countryInfo.long],
//     {color:'red',opacity:0.3,weight:1, fillColor: 'red',fillOpacity:.3, radius: rad})
//     .bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
//      .addTo(map);

// change the color based on feature's earthquake depth
cats = ['-10-10','10-30','30-50','50-70','70-90','90+'];
colors = ['LawnGreen', 'GreenYellow', 'PaleGoldenRod', 'Salmon', 'Orange', 'Red', 'LightGreen']

function getColor(d) {
  // then passing the depth into the circle color function
  return  d > 90 ? 'Red':
          d > 70 ? 'Orange':
          d > 50 ? 'Salmon':
          d > 30 ? 'PaleGoldenRod':
          d > 10 ? 'GreenYellow':
          d > -10 ? 'LawnGreen':
          'LightGreen';
}

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


    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><ul><li>Earthquake Magnitude: ${feature.properties.mag}</li><li>Earthquake Depth: ${feature.geometry.coordinates[2]}</li></ul>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //parsing the data and has default features we can use for further processing.
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {  
        // higher magnitudes, bigger circles
        radius:feature.properties.mag * 5,
        fillColor: getColor(feature.geometry.coordinates[2]),
        // color: 'red',//chooseColor(feature.geometry.coordinates[2]),
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
  var map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });
  
  // Create a legend to add to map
  var legend = L.control({position: 'bottomright'});
  // legend.onAdd = function() {};
  legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'info legend');
  // var labels = ['<strong>Depth</strong>'];
  // var categories = [cats];

  for (var i = 0; i < cats.length; i++) {
    var item = `<i class='square' style='background: ${colors[i]} '> ${cats[i]}</i><br>`
    console.log(item);
    div.innerHTML += item
        // labels.push(
        // `<i class='square' style='background:' + ${colors[i]} + ${cats[i]}</i><br>`;
  }
    // div.innerHTML = labels.join('<br>');
  return div;
  };
  legend.addTo(map);


  // Create a layer control.
  L.control.layers(
  // Pass it our baseMaps and overlayMaps. 
  baseMaps, overlayMaps, {
    collapsed: false
  // Add the layer control to the map.
  }).addTo(map);

}

