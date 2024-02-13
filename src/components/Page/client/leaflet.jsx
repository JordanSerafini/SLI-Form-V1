import  { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line react/prop-types
function LeafletMap({ address }) {
  useEffect(() => {
    // Initialisation de la carte
    const map = L.map('map').setView([0, 0], 13); // Coordonnées par défaut

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Géocodage de l'adresse
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // Mise à jour de la vue de la carte et ajout du marqueur
          map.setView([lat, lon], 13);
          L.marker([lat, lon]).addTo(map).bindPopup(address).openPopup();
        } else {
          console.error('Adresse non trouvée');
        }
      })
      .catch(error => console.error('Erreur lors du géocodage', error));

    // Nettoyage : cette fonction sera appelée lorsque le composant sera démonté
    return () => {
      map.remove();
    };
  }, [address]); // Assurez-vous de réexécuter cet effet si l'adresse change

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default LeafletMap;
