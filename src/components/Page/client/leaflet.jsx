import  { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line react/prop-types
function LeafletMap({ address }) {
  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // Créer la carte et la centrer sur les coordonnées
          const map = L.map('map').setView([lat, lon], 12);

          // Ajouter une couche de tuiles à la carte (ici, OpenStreetMap)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Ajouter un marqueur à la carte aux coordonnées obtenues
          const marker = L.marker([lat, lon]).addTo(map);

          // Vous pouvez également ajouter un popup au marqueur si vous le souhaitez
          marker.bindPopup(address).openPopup();
        } else {
          console.error('Adresse non trouvée');
        }
      })
      .catch(error => console.error('Erreur lors du géocodage', error));
  }, [address]); // Le useEffect s'exécutera lorsque l'adresse changera

  // Assurez-vous que l'élément div a un ID qui correspond à celui utilisé par L.map('map')
  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default LeafletMap;
