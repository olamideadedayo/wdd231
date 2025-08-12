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
// Load Success Stories (Dynamic Content)
// ==============================
async function loadStartups() {
    try {
        const response = await fetch("data/startups.json");
        if (!response.ok) throw new Error("Failed to fetch startup data");

        const startups = await response.json();

        const startupList = document.getElementById("startup-list");
        startupList.innerHTML = ""; // Clear any placeholder

        startups.forEach(startup => {
            const card = document.createElement("div");
            card.classList.add("startup-card");

            card.innerHTML = `
                <img src="images/${startup.image}" alt="${startup.name}" loading="lazy">
                <h3>${startup.name}</h3>
                <p>${startup.description}</p>
                <p><strong>Founded:</strong> ${startup.year}</p>
                <p><strong>Location:</strong> ${startup.location}</p>
            `;

            startupList.appendChild(card);
        });

} catch (error) {
        console.error(error);
        document.getElementById("startup-list").innerHTML = "<p>Failed to load success stories.</p>";
}

}


loadStartups();
