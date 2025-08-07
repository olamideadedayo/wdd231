// Footer year and last modified update (from chamber.js)
document.addEventListener("DOMContentLoaded", function() {
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  var lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = "Last Modification: " + document.lastModified.split(" ")[0];
  }
});
const sidebar = document.getElementById('visitMessage');
const now = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
  sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    sidebar.textContent = "Back so soon! Awesome!";
  } else {
    sidebar.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
  }
}
localStorage.setItem('lastVisit', now);

// Load JSON data
fetch("data/discover.json")
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector(".card-grid");
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = `card item${index + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure><img src="${item.image}" alt="${item.name}"/></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  });
