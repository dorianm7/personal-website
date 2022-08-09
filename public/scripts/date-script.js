window.addEventListener('DOMContentLoaded', () => {
    let copyrightYearEl = document.getElementById('copyright-year');
    copyrightYearEl.innerText = new Date().getFullYear();
});