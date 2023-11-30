async function searchMovies() {
    // Get the user input
    var movieQuery = document.getElementById('movieInput').value;

    // API URL
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/search';

    // API Headers
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd91894758emshe4dfbd4f6fee529p1bb281jsn7b1d2bd9c18c',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        // Encode the movie title before adding it to the URL
        const encodedQuery = encodeURIComponent(movieQuery);

        // Fetch data from the API
        const response = await fetch(`${url}?title=${encodedQuery}`, options);
        
        // Check if the response status is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const result = await response.json();

        // Display results
        displayMovieResults(result);
    } catch (error) {
        console.error(error);
    }
}

function displayMovieResults(movieData) {
    var movieListContainer = document.getElementById('movieList');
    movieListContainer.innerHTML = ''; // Clear previous results

    if (!movieData || !movieData.Search || movieData.Search.length === 0) {
        movieListContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Loop through the retrieved data and create HTML elements for each movie
    movieData.Search.forEach(movie => {
        var movieItem = document.createElement('div');
        movieItem.innerHTML = `
            <h3>${movie.Title} (${movie.Year})</h3>
            <p>Type: ${movie.Type}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
        movieListContainer.appendChild(movieItem);
    });
}
