document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') document.body.setAttribute('data-theme','dark');
    renderSchedule();
});

function escapeHtml(str){
    if (!str) return '';
    return String(str).replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function renderSchedule() {
    const availability = JSON.parse(localStorage.getItem('availability')) || [];
    const topics = JSON.parse(localStorage.getItem('topics')) || [];
    const output = document.getElementById('scheduleOutput');
    output.innerHTML = '';

    if (availability.length === 0) {
        output.innerHTML = '<p>No schedule available. Add availability first.</p>';
        return;
    }

    // Group availability by day
    const daysMap = {};
    availability.forEach(a => {
        if (!daysMap[a.day]) daysMap[a.day] = [];
        daysMap[a.day].push(a);
    });

    Object.keys(daysMap).forEach(day => {
        const dayBox = document.createElement('div');
        dayBox.className = 'p-3 border rounded mb-3';
        dayBox.innerHTML = `<h5>Day: ${day}</h5>`;

        // Limit 2–4 subjects per day
        const subjectsToShow = daysMap[day].slice(0, 4);

        subjectsToShow.forEach(a => {
            const topicInfo = topics.find(t => t.name === a.subject);
            const hours = topicInfo ? topicInfo.sessions * topicInfo.hoursPerSession : 'N/A';

            const subBox = document.createElement('div');
            subBox.className = 'p-2 border rounded mb-2';
            subBox.innerHTML = `
                <strong>Subject:</strong> ${escapeHtml(a.subject)} <br>
                <strong>Time:</strong> ${a.time} <br>
                <strong>Estimated Hours:</strong> ${hours}
            `;
            dayBox.appendChild(subBox);
        });

        output.appendChild(dayBox);
    });
}
