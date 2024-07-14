// This JS file will listen for a click on the side menu's links to then load the appropriate html file into the content box. 
document.addEventListener("DOMContentLoaded", () => {
    // These are variables that will keep track of the side-menu links and the content area
    const links = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');

    // Load home.html initially when index.html is loaded
    loadContent('content/home.html');

    // This is a click listener
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page);
        });
    });

    // This function will load the appropriate html file in the content directory.
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentArea.innerHTML = data;
            })
            .catch(error => {
                contentArea.innerHTML = '<h2>Error</h2><p>Sorry, an error occurred while loading the content.</p>';
                console.error('Error loading content:', error);
            });
    }
});
