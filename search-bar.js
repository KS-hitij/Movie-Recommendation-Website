document.addEventListener('DOMContentLoaded', function() {
    let movieTitles = [];

    fetch('./Assets/movie_titles.json')
        .then(response => response.json())
        .then(data => {
            movieTitles = data;

            // Initialize autocomplete functionality after data is loaded
            initializeAutocomplete();
        })
        .catch(error => {
            console.error('Error loading movie titles:', error);
        });

    function initializeAutocomplete() {
        const searchInput = document.querySelector('input[name="movie"]');
        const dropdown = document.createElement('ul');
        dropdown.classList.add('dropdown-menu');
        searchInput.parentNode.appendChild(dropdown);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            dropdown.innerHTML = ''; // Clear previous suggestions


            if (query.length > 0) {
                const filteredMovies = movieTitles.filter(title =>
                    title.toLowerCase().includes(query)
                );

                if (filteredMovies.length > 0) {
                    dropdown.classList.add('show'); // Show dropdown

                    filteredMovies.slice(0, 10).forEach(title => {
                        const item = document.createElement('li');
                        item.textContent = title;
                        item.classList.add('dropdown-item');
                        dropdown.appendChild(item);

                        item.addEventListener('click', function() {
                            searchInput.value = title;  // Set the selected title in the search bar
                            dropdown.innerHTML = '';    // Clear suggestions
                            dropdown.classList.remove('show'); // Hide dropdown
                        });
                    });
                } else {
                    dropdown.classList.remove('show'); 
                }
            } else {
                dropdown.classList.remove('show'); 
            }
        });
    }
});
