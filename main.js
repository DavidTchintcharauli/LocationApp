import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const locationButton = document.getElementById('locationButton');

locationButton.addEventListener('click', function () {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const userLocation = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });

      const userLocationLayer = new VectorLayer({
        source: new VectorSource({
          features: [userLocation],
        }),
        style: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'blue' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
        }),
      });

      map.addLayer(userLocationLayer);

      map.getView().setCenter(fromLonLat([longitude, latitude]));
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
});