// JavaScript code to fetch weather data using OpenWeatherMap API

// Replace with your actual API key
const apiKey = '60944d543be2a1b8559b29b367ebf93c';

// Function to fetch weather data based on latitude and longitude
function fetchWeatherByCoordinates(latitude, longitude) {
    // Construct the API URL using latitude and longitude
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant data
            const city = data.name; // Get city name from API response
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            // Insert data into the HTML
            document.getElementById('climate-info').innerHTML = `
                <h3>Weather in ${city}</h3>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('climate-info').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        });
}

// Function to get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
                document.getElementById('climate-info').innerHTML = `<p>Unable to retrieve location. Please check your location settings and try again.</p>`;
            }
        );
    } else {
        document.getElementById('climate-info').innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

// Call the function to get user location and fetch weather data
getUserLocation();
