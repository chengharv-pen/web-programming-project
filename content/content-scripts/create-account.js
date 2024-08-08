document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createAccountForm');
    const message = document.querySelector('.message');

    // Event listener that handles form submission
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

        try {
            // Step 1: Check username availability
            const response = await fetch('/check-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (data.exists) {
                message.textContent = 'Username already exists. Please choose a different username.';
            } else {
                // Step 2: Create account if username does exist.
                const createResponse = await fetch('/create-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const createData = await createResponse.json();

                if (createData.success) {
                    message.textContent = 'Account successfully created! You can now log in.';
                } else {
                    message.textContent = 'There was a problem creating the account. Please try again.';
                }
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