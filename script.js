document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for initializing the map and tracking Santa's location
    initializeMap();
    loadGames();
});

function initializeMap() {
    // Example of map initialization
    const mapContainer = document.getElementById('map-container');
    // You would integrate a real map here, like Google Maps API or OpenStreetMap
    mapContainer.innerHTML = '<p>Map loading...</p>';
}

function loadGames() {
    const game1 = document.getElementById('game1');
    const game2 = document.getElementById('game2');

    // Placeholder for game initialization
    game1.innerHTML = '<button onclick="startGame1()">Play Game 1</button>';
    game2.innerHTML = '<button onclick="startGame2()">Play Game 2</button>';
}

function startGame1() {
    alert('Game 1 is under construction!');
}

function startGame2() {
    alert('Game 2 is under construction!');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    loadGames();
    startTrackingSanta();
});

let map, santaMarker;

function initializeMap() {
    // Create the map
    map = L.map('map-container').setView([0, 0], 2); // Default view to a broad area

    // Add a tile layer (you can use other providers if you prefer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a placeholder marker for Santa
    santaMarker = L.marker([0, 0]).addTo(map);
    santaMarker.bindPopup('<b>Santa is here!</b>').openPopup();
}

function startTrackingSanta() {
    const apiUrl = 'https://santa-api.appspot.com/info?client=web&language=en&fingerprint=&routeOffset=0&streamOffset=0';
    
    // Fetch Santa's location data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateSantaLocation(data);
            // Update location periodically
            setInterval(() => {
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => updateSantaLocation(data));
            }, 5000); // Update every 5 seconds
        })
        .catch(error => console.error('Error fetching Santa location:', error));
}

function updateSantaLocation(data) {
    if (data && data.latitude && data.longitude) {
        const lat = data.latitude;
        const lon = data.longitude;
        santaMarker.setLatLng([lat, lon]);
        map.setView([lat, lon], 2);
        santaMarker.setPopupContent('<b>Santa is here!</b><br>Latitude: ' + lat + '<br>Longitude: ' + lon);
    }
}


