document.addEventListener('DOMContentLoaded', () => {
    const sidebarButtons = document.querySelectorAll('.sidebar button');

    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span')?.innerText.toLowerCase();

            switch(text) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'add topics':
                    window.location.href = 'topics.html';
                    break;
                case 'availability':
                    window.location.href = 'availability.html';
                    break;
                case 'schedule':
                    window.location.href = 'schedule.html';
                    break;
                case 'dark mode':
                    toggleTheme(); // darkmode function already exist
                    break;
            }
        });
    });

    // highlight active tab based on current URL
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    sidebarButtons.forEach(btn => {
        const text = btn.querySelector('span')?.innerText.toLowerCase().replace(' ', '');
        if(currentPage.includes(text)) {
            btn.classList.add('active-tab');
        } else {
            btn.classList.remove('active-tab');
        }
    });
});
