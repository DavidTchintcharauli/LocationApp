import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

locationButton.addEventListener('click', function() {
  // Check if the Geolocation API is supported by the browser
  if ('geolocation' in navigator) {
    // Use the Geolocation API to get the user's current position
    navigator.geolocation.getCurrentPosition(function(position) {
      // Retrieve the latitude and longitude coordinates
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var userLocation = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]))
      });

      var userLocationLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [userLocation]
        }),
        style: new ol.style.Style({
          image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({ color: 'blue' }),
            stroke: new ol.style.Stroke({ color: 'white', width: 2 })
          })
        })
      });

      map.addLayer(userLocationLayer);

      map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
});
