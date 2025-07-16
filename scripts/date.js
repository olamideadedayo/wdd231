// Set current year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModified = document.getElementById('lastModified');
if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

