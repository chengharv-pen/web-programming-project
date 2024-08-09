console.log(window.location.href);

document.addEventListener('DOMContentLoaded', function () {
    // Step 1: fetch the available-pet-info.txt, to then write the pets in browse.html
    fetch('available-pet-info.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            const petContainer = document.querySelector('.pet-container');
            petContainer.innerHTML = '';  // Clear any existing content

            lines.forEach(line => {
                if (line.trim()) {  // Skip empty lines
                    const parts = line.split(':');
                    const petDiv = document.createElement('div');
                    petDiv.className = 'pet';

                    petDiv.innerHTML = `
                        <h3 class="pet-name">${parts[2]}</h3>
                        <p><img class="pet-image" src="./content-images/${parts[3]}" alt="no pet image was submitted"></p>
                        <button class="interested-button">Interested</button>
                        <p>Type of pet: <span class="animalType">${parts[4]}</span></p>
                        <p>Breed of pet: <span class="breed">${parts[5]}</span></p>
                        <p>Age of animal: <span class="age">${parts[6]}</span></p>
                        <p>Gender: <span class="gender">${parts[7]}</span></p>
                        <p>Gets along with other dogs: <span class="compatibility">${parts[8]}</span></p>
                        <p>Gets along with other cats: <span class="compatibility">${parts[9]}</span></p>
                        <p>Suitable for a family with small children: <span class="compatibility">${parts[10]}</span></p>
                        <p>Comment area:</p>
                        <blockquote class="comment">${parts[11]}</blockquote>
                        <p>Current owner's name: <span class="name">${parts[12]}</span></p>
                        <p>Owner's email: <span class="email">${parts[13]}</span></p>
                    `;

                    petContainer.appendChild(petDiv);
                }
            });
        }).then(() => {
            // Get URL parameters and filter pets
            const params = getUrlParams();
            filterPets(params);
        })
        .catch(error => console.error('Error fetching the pet data:', error));


    // Step 2: Filter the pets based on the form inputs from find.html
    // Function to convert unformatted ages to formatted ages (ex: puppy >>> 1)
    function convertAge(unformattedAge) {
        switch (unformattedAge) {
            case 'puppy':
                return 1;
            case 'young':
                return 3;
            case 'adult':
                return 8;
            case 'senior':
                return Infinity;
            case 'any':
                return Infinity;
        }
    }

    // Function to get URL parameters
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            animalType: params.get('animalType'),
            age: convertAge(params.get('age')),
            gender: params.get('gender'),
            breed: decodeURIComponent(params.get('breed')),
            compatibility: decodeURIComponent(params.get('compatibility'))
        };
    }

    // Function to filter pets based on URL parameters
    function filterPets(params) {
        const pets = document.querySelectorAll('.pet');

        pets.forEach(pet => {
            const petAnimalType = pet.querySelector('.animalType').textContent.trim();
            const petAge = pet.querySelector('.age').textContent.trim();
            const petGender = pet.querySelector('.gender').textContent.trim();
            const petBreed = pet.querySelector('.breed').textContent.trim();

            let matches = true;

            // Filter 1: This filters by animal type
            if (params.animalType && petAnimalType !== params.animalType) {
                matches = false;
            }

            // Filter 2: Here, I have decided to display all pets that are under or equal to the upper bound of the preferred age.
            if (params.age && petAge >= params.age) {
                matches = false;
            }

            // Filter 3: This filters by gender
            if (params.gender && petGender !== params.gender && params.gender !== 'any') {
                matches = false;
            }

            // Filter 4: This filters by breed
            console.log('Breed: ' + params.breed + ' ' + petBreed);
            if (params.breed && petBreed !== params.breed && params.breed.toLowerCase() !== "doesn't matter") {
                matches = false;
            }

            // Filter 5: This filters by compatibility, in this order: dogs, cats, small children
            // Get all elements with the class '.compatibility'
            const petCompatibilityNodes = pet.querySelectorAll('.compatibility');

            // Convert the NodeList to an array and map over it to get the trimmed text content
            const petCompatibility = Array.from(petCompatibilityNodes).map(node => {
                if (node) {
                    return node.textContent.trim();
                } else {
                    return undefined
                }
            });
            console.log(petCompatibility);

            const criteria = ['dogs', 'cats', 'small children'];
            const index = criteria.indexOf(params.compatibility);
            console.log(index + ' ' + params.compatibility);
            if (index === -1 && params.compatibility.toLowerCase() !== "doesn't matter") {
                matches = false;
            } else if (params.compatibility && petCompatibility[index] === 'No' && params.compatibility.toLowerCase() !== "doesn't matter") {
                matches = false;
            }

            // This is where we decide if a certain pet div will be displayed or not.
            if (matches) {
                pet.style.display = 'block';
            } else {
                pet.style.display = 'none';
            }
        });
    }
});