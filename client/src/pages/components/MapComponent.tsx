import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css'; 

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { latitude, longitude } = coordinates;
    if (!mapRef.current) {
      const L = require('leaflet');
      const map = L.map('mapa').setView([latitude, longitude], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Localização').openPopup();
    } else {
      
      mapRef.current.setView([latitude, longitude], 13);
    }
  }, [coordinates]);

  return (
    <div id="mapa" style={{ height: '400px', width: '100%' }}></div>
  );
};

export default MapComponent;
