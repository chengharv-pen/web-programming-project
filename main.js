const navLinks = document.querySelectorAll('.nav-link');
const headerNavLink = document.querySelector('.header-nav-link');
const footerNavLink = document.querySelector('.footer-nav-link');
const iframe = document.getElementById('iframe');

window.onload = redirectIframe;
updateDateTime;

setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', function () {

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    headerNavLink.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[0].classList.add('active');
    })

    footerNavLink.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
    })
});

// This listener will send a POST request for side menu items with the class 'post-request'.
document.querySelectorAll('.post-request').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        const url = link.getAttribute('data-url');
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        // Set target to the content area
        form.target = 'content';

        document.body.appendChild(form);
        form.submit();

        // Remove form after submission
        document.body.removeChild(form);
    });
});

function redirectIframe() {
    document.getElementById('iframe').src = 'content/home.html';
}

function updateDateTime() {
    const dateTimeElement = document.querySelector('.header-date-time');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // Displaying in dd-mm-yyyy format instead of mm-dd-yyyy.
    const formattedTime = now.toLocaleTimeString();

    dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
}