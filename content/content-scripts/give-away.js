document.getElementById('giveawayForm').addEventListener('submit', function (event) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });

    // Validate Animal Type field
    const animalType = document.getElementById('animalType');
    if (animalType.value === '') {
        document.getElementById('animalTypeError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate Breed field
    const breed = document.getElementById('breed');
    if (breed.value === '') {
        document.getElementById('breedError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate Age field
    const age = document.getElementById('age');
    if (!(parseFloat(age.value) || age.value.toLowerCase() === "doesn't matter")) {
        document.getElementById('ageError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate Gender field
    const gender = document.getElementById('gender');
    if (gender.value === '') {
        document.getElementById('genderError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate alongDog field
    const alongDog = document.getElementById('alongDog');
    if (alongDog.value === '') {
        document.getElementById('alongDogError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate alongCat field
    const alongCat = document.getElementById('alongCat');
    if (alongCat.value === '') {
        document.getElementById('alongCatError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate suitableFamily field
    const suitableFamily = document.getElementById('suitableFamily');
    if (suitableFamily.value === '') {
        document.getElementById('suitableFamilyError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate comment field
    const comment = document.getElementById('comment');
    if (comment.value === '') {
        document.getElementById('commentError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate name field
    const name = document.getElementById('name');
    if (name.value === '') {
        document.getElementById('nameError').textContent = 'This field is required';
        isValid = false;
    }

    // Validate email field
    const email = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.value.match(emailRegex) || email.value === '') {
        document.getElementById('emailError').textContent = 'This field is required';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

document.querySelector('.clear-button').addEventListener('click', function () {
    document.getElementById('giveawayForm').reset();

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
});