const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

// Highlight active nav link based on current URL
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.href === window.location.href || link.getAttribute('href') === '#') {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
