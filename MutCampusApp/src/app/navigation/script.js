let map;
let userMarker;
let service;

function initMap() {
    // Initialize the map centered at a specific location
    const location = { lat: -29.969804427818424, lng: 30.910702475142774 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
    });

    // Track user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // Place a marker at the user's location
            userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "You are here",
            });

            map.setCenter(userLocation);
        });
    }

    // Initialize the Places service
    service = new google.maps.places.PlacesService(map);

    // Add event listener for the find button
    document.getElementById("find").addEventListener("click", () => {
        const query = document.getElementById("search").value;
        findBuilding(query);
    });
}

function findBuilding(query) {
    const request = {
        query: query,
        location: map.getCenter(),
        radius: '500', // Search within 500 meters
    };

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const place = results[0];
            const placeLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            // Navigate to the building
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            const directionsRequest = {
                origin: userMarker.getPosition(),
                destination: placeLocation,
                travelMode: google.maps.TravelMode.WALKING,
            };

            directionsService.route(directionsRequest, (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                }
            });

            // Place a marker at the building location
            new google.maps.Marker({
                position: placeLocation,
                map: map,
                title: place.name,
            });
        } else {
            alert("Building not found!");
        }
    });
}

// Initialize the map
google.maps.event.addDomListener(window, 'load', initMap);