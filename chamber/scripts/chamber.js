document.addEventListener("DOMContentLoaded", function () {
    const weatherContainer = document.getElementById("current-weather");
    const forecastContainer = document.getElementById("forecast");

    // Timbuktu coordinates
    const latitude = 16.7735;
    const longitude = -3.0074;

    // Open-Meteo API URL
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

    // Weather code to icon mapping (simple SVGs or emoji for demo)
    function getWeatherIcon(code) {
        // Example mapping, expand as needed
        if (code === 0) return '☀️'; // Clear
        if (code === 1 || code === 2) return '🌤️'; // Mainly clear/partly cloudy
        if (code === 3) return '☁️'; // Overcast
        if (code >= 45 && code <= 48) return '🌫️'; // Fog
        if (code >= 51 && code <= 67) return '🌦️'; // Drizzle
        if (code >= 71 && code <= 77) return '❄️'; // Snow
        if (code >= 80 && code <= 82) return '🌧️'; // Rain showers
        if (code >= 95) return '⛈️'; // Thunderstorm
        return '❔'; // Unknown
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display current weather
            const currentTemp = data.current.temperature_2m;
            const currentCode = data.current.weathercode;
            const currentIcon = getWeatherIcon(currentCode);
            weatherContainer.innerHTML = `
                <h3>Current Weather</h3>
                <div style="font-size:2em;">${currentIcon}</div>
                <p>Temperature: ${currentTemp}°C</p>
            `;

            // Display 3-day forecast
            const days = data.daily.time.slice(0, 3);
            const maxTemps = data.daily.temperature_2m_max.slice(0, 3);
            const minTemps = data.daily.temperature_2m_min.slice(0, 3);
            const codes = data.daily.weathercode.slice(0, 3);

            forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";
            for (let i = 0; i < 3; i++) {
                const icon = getWeatherIcon(codes[i]);
                forecastContainer.innerHTML += `
                    <div class="forecast-day">
                        <strong>${days[i]}</strong><br>
                        <span style='font-size:1.5em;'>${icon}</span><br>
                        Max: ${maxTemps[i]}°C<br>
                        Min: ${minTemps[i]}°C<br>
                    </div>
                `;
            }
        })
        .catch(error => {
            weatherContainer.innerHTML = "<p>Error fetching weather data.</p>";
            forecastContainer.innerHTML = "";
            console.error("Weather API error:", error);
        });
});