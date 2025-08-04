// Hamburger menu toggle for mobile nav
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });
  }
});
// Welcome alert when the page loads
window.addEventListener('load', () => {
  alert('Welcome to the ChillMaster Tech Hub Site Plan!');
});

// Toggle visibility of wireframes section
function toggleWireframes() {
  const section = document.getElementById('wireframes');
  if (section.style.display === 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}
