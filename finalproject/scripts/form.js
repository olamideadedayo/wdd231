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
}
