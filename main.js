const navLinks = document.querySelectorAll('.nav-link');
const headerNavLink = document.querySelector('.header-nav-link');
const footerNavLink = document.querySelector('.footer-nav-link');

window.onload = redirectIframe;

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

function redirectIframe() {
    document.getElementById('iframe').src = 'content/home.html';
}