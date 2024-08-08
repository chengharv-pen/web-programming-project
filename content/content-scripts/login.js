document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const message = document.querySelector('.message');

    form.addEventListener('submit', async (event) => {

        // Prevent default form submission
        event.preventDefault();

        const username = form.username.value.trim();
        const password = form.password.value.trim();

        // Validate username and password
        if (!validateUsername(username)) {
            message.textContent = 'Invalid username. Only letters and digits are allowed.';
            return;
        }

        if (!validatePassword(password)) {
            message.textContent = 'Invalid password. Must be at least 4 characters long, with at least one letter and one digit.';
            return;
        }

        // Send login request
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            // If successful, redirect to content/give-away.html
            if (data.success) {
                window.location.href = '/content/give-away.html';
            } else {
                message.textContent = 'Login failed. Please check your username and password.';
            }
        } catch (error) {
            message.textContent = 'An error occurred. Please try again later.';
        }
    });

    // This function validates the username using regex
    function validateUsername(username) {
        return /^[a-zA-Z0-9]+$/.test(username);
    }

    // This function validates the password using regex and a length condition
    function validatePassword(password) {
        return password.length >= 4 &&
            /[a-zA-Z]/.test(password) &&
            /[0-9]/.test(password);
    }
});