var app = {};
var map = L.map('map').setView([38.878432, -77.109218], 15);

app.load = function() {

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
      maxZoom: 18
  }).addTo(map);
  $.getJSON("map.geojson", function(json) {
    var testlayer = L.geoJson(json);
    var sliderControl = L.control.sliderControl({
        position: "topright",
        layer: testlayer
      });

    map.addControl(sliderControl);
    sliderControl.startSlider();
  });
      var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polyline: {
                shapeOptions: {
                    color: '#333333'
                }
            },
            polygon: {
                shapeOptions: {
                    color: '#333333'
                }
            },
            circle: {
                shapeOptions: {
                    color: '#333333'
                }
            },
            rectangle: {
                shapeOptions: {
                    color: '#333333'
                }
            }
        }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });
};
