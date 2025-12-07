document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('themeToggle');

    // Check saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme','dark');
    }

    // Toggle dark mode on click
    toggleBtn.addEventListener('click', () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme','light');
        } else {
            body.setAttribute('data-theme','dark');
            localStorage.setItem('theme','dark');
        }
    });
});
