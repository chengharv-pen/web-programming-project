document.getElementById('searchForm').addEventListener('submit', function (event) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });

    // Validate Animal Type field
    const animalType = document.getElementById('animalType');
    if (animalType.value === '') {
        document.getElementById('animalTypeError').textContent = 'This field is required.';
        isValid = false;
    }

    // Validate Breed field
    const breed = document.getElementById('breed');
    if (breed.value === '') {
        document.getElementById('breedError').textContent = 'This field is required.';
        isValid = false;
    }

    // Validate Age field
    const age = document.getElementById('age');
    if (age.value === '') {
        document.getElementById('ageError').textContent = 'This field is required.';
        isValid = false;
    }

    // Validate Gender field
    const gender = document.getElementById('gender');
    if (gender.value === '') {
        document.getElementById('genderError').textContent = 'This field is required.';
        isValid = false;
    }

    // Validate Compatibility field
    const compatibility = document.getElementById('compatibility');
    if (compatibility.value === '') {
        document.getElementById('compatibilityError').textContent = 'This field is required.';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

document.querySelector('.clear-button').addEventListener('click', function () {
    document.getElementById('searchForm').reset();

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
});