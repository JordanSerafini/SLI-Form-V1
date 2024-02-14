import  { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line react/prop-types
function LeafletMap({ address }) {
  // État pour suivre si une adresse a été trouvée
  const [addressFound, setAddressFound] = useState(true);

  useEffect(() => {
    let map;

    const initMap = () => {
      map = L.map('map').setView([0, 0], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    };

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setAddressFound(true); // Adresse trouvée
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // Initialise la carte si nécessaire
          if (!map) initMap();

          // Mise à jour de la vue de la carte et ajout du marqueur
          map.setView([lat, lon], 13);
          L.marker([lat, lon]).addTo(map).bindPopup(address).openPopup();
        } else {
          console.error('Adresse non trouvée');
          setAddressFound(false); // Indique que l'adresse n'a pas été trouvée
          if (map) map.remove(); // Nettoie la carte si elle a été initialisée
        }
      })
      .catch(error => {
        console.error('Erreur lors du géocodage', error);
        setAddressFound(false); // Erreur de géocodage, adresse considérée comme non trouvée
      });

    return () => {
      if (map) map.remove(); // Nettoyage de la carte
    };
  }, [address]); // Réexécuter cet effet si l'adresse change

  // Affiche un message si l'adresse n'est pas trouvée, sinon affiche la carte
  return addressFound ? (
    <div className="z-50" id="map"  style={{ height: '400px', width: '100%' }}></div>
  ) : (
    <div style={{ height: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Adresse non trouvée.
    </div>
  );
}

export default LeafletMap;
