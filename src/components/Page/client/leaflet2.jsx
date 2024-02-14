// Exemple de données clients (latitude, longitude)
const clients = [
    {id: 1, name: 'Client A', lat: 48.8566, lng: 2.3522}, // Paris
    {id: 2, name: 'Client B', lat: 43.6045, lng: 1.4440}, // Toulouse
    // Ajoutez d'autres clients ici
];

// Point central (exemple : Paris) et rayon (en kilomètres)
const center = {lat: 48.8566, lng: 2.3522}; // Paris
const radius = 10; // 10 km

// Fonction pour calculer la distance entre deux points (Formule de Haversine)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// Filtrer les clients dans le rayon défini
const filteredClients = clients.filter(client => {
    const distance = calculateDistance(center.lat, center.lng, client.lat, client.lng);
    return distance <= radius;
});

// Initialiser la carte Leaflet
const map = L.map('map').setView([center.lat, center.lng], 13);

// Ajouter une couche de tuiles à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajouter des marqueurs pour les clients filtrés
filteredClients.forEach(client => {
    L.marker([client.lat, client.lng])
        .bindPopup(`${client.name}`)
        .addTo(map);
});
