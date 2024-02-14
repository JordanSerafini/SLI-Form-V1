import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapLeaflet = () => {
  const clients = [
    { id: 1, name: "Client A", lat: 43.3, lng: 5.4 }, // Marseille
    { id: 2, name: "Client B", lat: 43.6045, lng: 1.444 }, // Toulouse
    { id: 3, name: "Client C", lat: 50.8503, lng: 4.3517 }, // Bruxelles
    { id: 4, name: "Client D", lat: 51.1657, lng: 10.4515 }, // Allemagne
    { id: 5, name: "Client E", lat: 52.52, lng: 13.405 }, // Berlin
    { id: 6, name: "Client F", lat: 41.9028, lng: 12.4964 }, // Rome
  ];

  const center = { lat: 48.8566, lng: 2.3522 }; // Paris
  const radius = 10; // 10 km

  useEffect(() => {
    // Fonction pour calculer la distance entre deux points (Formule de Haversine)
    function calculateDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Rayon de la Terre en km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLng = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }

    // Filtrer les clients dans le rayon défini
    const filteredClients = clients.filter((client) => {
      const distance = calculateDistance(
        center.lat,
        center.lng,
        client.lat,
        client.lng
      );
      return distance <= radius;
    });

    // Initialiser la carte Leaflet
    const map = L.map("map").setView([center.lat, center.lng], 13);

    // Ajouter une couche de tuiles à la carte
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Ajouter des marqueurs pour les clients filtrés
    filteredClients.forEach((client) => {
      L.marker([client.lat, client.lng]).bindPopup(`${client.name}`).addTo(map);
    });

    // Nettoyer la carte lorsque le composant est démonté
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default MapLeaflet;
