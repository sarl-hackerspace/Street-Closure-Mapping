var app = {};
var map = {};
app.load = function() {
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map').setView([38.878432, -77.109218], 15);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
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
            /*,
            marker: {
                icon: new MyCustomMarker()
            }*/
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

    $.getJSON("points.json", function (json) {
        console.dir(json);
        var testlayer = L.geoJson(json);
        var sliderControl = L.control.sliderControl({position: "topright", layer: testlayer});

        //For a Range-Slider use the range property:
        //sliderControl = L.control.sliderControl({position: "topright", layer: testlayer, range: true});

        //Make sure to add the slider to the map ;-)
        map.addControl(sliderControl);
        //And initialize the slider
        sliderControl.startSlider();
    });
};