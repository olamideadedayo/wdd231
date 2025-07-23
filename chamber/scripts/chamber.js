
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
      for (let i = 0; i < 3; i++) {
        const forecast = data.list[i];
        forecastHTML += `<p>${forecast.dt_txt}: ${forecast.weather[0].description}, ${forecast.main.temp}°C</p>`;
      }
      forecastContainer.innerHTML = forecastHTML;
    })
    .catch(error => {
      forecastContainer.innerHTML = "<p>Unable to fetch forecast data.</p>";
    });
  const membersContainer = document.getElementById("members");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  // Toggle view
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    fetchMembers();
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    fetchMembers();
  });

  // Fetch and display members
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = "";
    const isListView = membersContainer.classList.contains("list-view");
    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member-card");
      if (isListView) {
        // List view: no image
        card.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="membership">Membership Level: ${member.membership}</p>
        `;
      } else {
        // Grid view: show image
        let logoPath = member.image.startsWith("images/") ? member.image : `images/${member.image}`;
        card.innerHTML = `
          <img src="${logoPath}" alt="${member.name} logo" class="member-logo" width="50" height="50" loading="lazy">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="membership">Membership Level: ${member.membership}</p>
        `;
      }
      membersContainer.appendChild(card);
    });
  }

  // Footer year and last modified
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  fetchMembers();
});
