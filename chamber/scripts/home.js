document.addEventListener("DOMContentLoaded", () => {
  // WEATHER API LOGIC
  const weatherContainer = document.getElementById("current-weather");
  const forecastContainer = document.getElementById("forecast");
  const city = "Lagos";
  const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p>${data.weather[0].description}, ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      weatherContainer.innerHTML = "<p>Unable to fetch weather data.</p>";
    });

  // Fetch weather forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      let forecastHTML = "<h2>Weather Forecast</h2>";
      // Show next 3 forecast periods (one per day)
      let daysShown = 0;
      let lastDate = "";
      for (let i = 0; i < data.list.length && daysShown < 3; i++) {
        const forecast = data.list[i];
        const date = forecast.dt_txt.split(" ")[0];
        if (date !== lastDate) {
          forecastHTML += `<p>${date}: ${forecast.weather[0].description}, ${forecast.main.temp}°C</p>`;
          lastDate = date;
          daysShown++;
        }
      }
      forecastContainer.innerHTML = forecastHTML;
    })
    .catch(error => {
      forecastContainer.innerHTML = "<p>Unable to fetch forecast data.</p>";
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const businessListings = document.querySelector(".business-listings");
  if (!businessListings) return;

  fetch("data/members.json")
    .then(response => response.json())
    .then(members => {
      // Filter for gold (3) or silver (2) membership
      const goldSilver = members.filter(m => m.membership === 2 || m.membership === 3);
      // Shuffle array
      for (let i = goldSilver.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [goldSilver[i], goldSilver[j]] = [goldSilver[j], goldSilver[i]];
      }
      // Select 2–3 members
      const selected = goldSilver.slice(0, Math.floor(Math.random() * 2) + 2);
      businessListings.innerHTML = selected.map(member => `
        <div class="business-card">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <hr>
          <p>Email: ${member.email || "N/A"}</p>
          <p>Contact: ${member.phone}</p>
          <p>Url: <a href="${member.website}" target="_blank">${member.website || "N/A"}</a></p>
          <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
        </div>
      `).join("");
    });
});
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