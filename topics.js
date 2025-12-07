document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') document.body.setAttribute('data-theme','dark');

    document.getElementById('addTopicBtn').addEventListener('click', () => addTopic());
    document.getElementById('saveTopicsBtn').addEventListener('click', saveTopics);
});

let topicIndex = 0;

function addTopic(saved=null) {
    const container = document.getElementById('topicList');
    const box = document.createElement('div');
    box.className = 'p-3 mb-3 border rounded';

    const nameVal = saved?.name || '';
    const diffVal = saved?.diff || 1;

    box.innerHTML = `
        <label>Topic Name</label>
        <input class="form-control mb-2" id="topicName${topicIndex}" value="${escapeHtml(nameVal)}">

        <label>Difficulty (0-5)</label>
        <input type="number" class="form-control mb-2" id="difficulty${topicIndex}" min="0" max="5" value="${diffVal}">
    `;
    topicIndex++;
    container.appendChild(box);
}

function escapeHtml(str){
    if (!str) return '';
    return String(str).replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function saveTopics() {
    const topics = [];
    for (let i=0;i<topicIndex;i++){
        const name = document.getElementById(`topicName${i}`)?.value.trim();
        let diff = parseInt(document.getElementById(`difficulty${i}`)?.value);

        if (!name) continue;

        // Validation: difficulty must be 0-5
        if (isNaN(diff) || diff < 0 || diff > 5) {
            alert(`Invalid difficulty for topic "${name}". Please choose a value between 0 and 5.`);
            return; // stop saving if invalid
        }

        // Calculate sessions and hours based on difficulty
        let sessions = 0, hoursPerSession = 0;
        if (diff >=0 && diff <=1) { 
            sessions=3; 
            hoursPerSession = Math.floor(Math.random()*2)+1; // 1-2 hours
        } else if (diff>=2 && diff<=3) { 
            sessions=5; 
            hoursPerSession = Math.floor(Math.random()*2)+2; // 2-3 hours
        } else if (diff>=4 && diff<=5) { 
            sessions=6; 
            hoursPerSession = Math.floor(Math.random()*2)+4; // 4-5 hours
        }

        topics.push({name, diff, sessions, hoursPerSession});
    }

    localStorage.setItem('topics', JSON.stringify(topics));

    // Show modal / summary
    const summaryBox = document.getElementById('topicsSummaryBox');
    const summaryContent = document.getElementById('topicsSummaryContent');
    summaryContent.innerHTML = '';
    topics.forEach(t=>{
        summaryContent.innerHTML += `<p><strong>${escapeHtml(t.name)}</strong> | Difficulty: ${t.diff} | Total Hours: ${t.sessions * t.hoursPerSession} (${t.sessions} sessions x ${t.hoursPerSession} hrs)</p>`;
    });
    summaryBox.style.display = 'block';
}
