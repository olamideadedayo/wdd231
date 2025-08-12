window.onload = function () {
    // Animate cards
    document.querySelectorAll('.membership-card').forEach(card => {
        card.classList.add('visible');
    });

    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Populate thank you page
    const getQueryParam = param => new URLSearchParams(window.location.search).get(param);
    const fields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'timestamp'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = getQueryParam(id);
    });
};

function showModal(id) {
    document.getElementById(id).style.display = 'block';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';



// Get query parameters from URL
function getQueryParams() {
  const params = {};
  window.location.search.replace(/^[?]/, '').split('&').forEach(function(pair) {
    const [key, value] = pair.split('=');
    if (key) params[key] = decodeURIComponent(value || '');
  });
  return params;
}
window.onload = function() {
  const params = getQueryParams();
  if (params.firstName) document.getElementById('firstName').textContent = params.firstName;
  if (params.lastName) document.getElementById('lastName').textContent = params.lastName;
  if (params.email) document.getElementById('email').textContent = params.email;
  if (params.phone) document.getElementById('phone').textContent = params.phone;
  if (params.organization) document.getElementById('organization').textContent = params.organization;
  if (params.timestamp) document.getElementById('timestamp').textContent = params.timestamp;
};

}



