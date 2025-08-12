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
// Form Handling with Local Storage & Modal
// ==============================
const contactForm = document.querySelector("form");

// Create modal element
const modal = document.createElement("div");
modal.id = "confirmation-modal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgba(0,0,0,0.5)";
modal.style.display = "flex";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 6px; max-width: 400px; text-align: center;">
        <h2>Thank You!</h2>
        <p>Your message has been received. We will get back to you shortly.</p>
        <button id="close-modal" style="background: #004b63; color: white; padding: 0.6rem 1rem; border: none; border-radius: 4px; cursor: pointer;">Close</button>
    </div>
`;
document.body.appendChild(modal);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        reason: document.querySelector("input[name='reason']:checked")?.value || "",
        message: document.getElementById("message").value,
        newsletter: document.querySelector("input[name='newsletter']").checked
    };

    // Save to local storage
    localStorage.setItem("contactFormData", JSON.stringify(formData));

    // Show modal
    modal.style.display = "flex";
});

// Close modal
document.addEventListener("click", (e) => {
    if (e.target.id === "close-modal" || e.target.id === "confirmation-modal") {
        modal.style.display = "none";
        contactForm.reset();
    }
});
