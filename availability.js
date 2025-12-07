document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') document.body.setAttribute('data-theme','dark');

    document.getElementById('saveAvailabilityBtn').addEventListener('click', saveAvailability);

    loadAvailability();
});

// Escape HTML to prevent XSS
function escapeHtml(str){
    if (!str) return '';
    return String(str).replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function saveAvailability() {
    const day = document.getElementById('daySelect').value;
    const time = document.getElementById('timeInput').value;
    const subject = document.getElementById('subjectInput').value.trim();

    if (!day || !time || !subject) {
        alert("Please fill all fields!");
        return;
    }

    let availability = JSON.parse(localStorage.getItem('availability')) || [];

    // Duplicate check: same day & same time
    const exists = availability.some(a => a.day === day && a.time === time);
    if (exists) {
        alert(`This slot on ${day} at ${time} is already booked!`);
        return;
    }

    availability.push({ day, time, subject });
    localStorage.setItem('availability', JSON.stringify(availability));

    // Clear inputs
    document.getElementById('subjectInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('daySelect').selectedIndex = 0;

    loadAvailability();
}

function loadAvailability() {
    const availability = JSON.parse(localStorage.getItem('availability')) || [];
    const summary = document.getElementById('availabilitySummary');
    summary.innerHTML = '';

    if (availability.length === 0) {
        summary.innerHTML = '<p>No availability saved yet.</p>';
        return;
    }

    availability.forEach(a => {
        summary.innerHTML += `<p><strong>${escapeHtml(a.subject)}</strong> | Day: ${a.day} | Time: ${a.time}</p>`;
    });
}
