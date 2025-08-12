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
