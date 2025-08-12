// ==============================
// Mobile Menu Toggle
// ==============================
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// ==============================
// Footer Year
// ==============================
document.getElementById("year").textContent = new Date().getFullYear();

// ==============================
// Wayfinding (Highlight Active Page)
// ==============================
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("#nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// ==============================
// Load Events Dynamically
// ==============================
async function loadEvents() {
    try {
        const response = await fetch("data/events.json");
        if (!response.ok) throw new Error("Failed to fetch events data");

        const events = await response.json();
        const eventsContainer = document.getElementById("events-calendar");

        eventsContainer.innerHTML = ""; // Clear placeholder

        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;

            eventsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        document.getElementById("events-calendar").innerHTML = "<p>Failed to load events.</p>";
    }
}

loadEvents();
