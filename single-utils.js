async function fetchMovies(searchTerm) {
    const apiUrl = `http://www.omdbapi.com/?apikey=b39ffab&i=${searchTerm}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
  
  function searchMovie(searchTerm) {
    if (searchTerm === "") {
      return { Error: "empty search Term" };
    }
    fetchMovies(searchTerm)
      .then((movie) => {
        if (!movie.hasOwnProperty("Title")) {
          const noMovieView = document.getElementById("no-movie");
          noMovieView.hidden = false;
        }
  
        renderMovies(movie);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }
  
  // Function to render movies
  function renderMovies(movie) {
    const noMovieView = document.getElementById("no-movie");
    if (noMovieView) {
      noMovieView.remove();
    }
  
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
  
    const movieTile = document.createElement("div");
    movieTile.classList.add("movie-tile");
  
    const movieImage = document.createElement("img");
    movieImage.src = movie.Poster;
    movieImage.alt = movie.Title;
    movieImage.classList.add("movie-image");
    movieTile.appendChild(movieImage);
  
    const movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${movie.Title} - ${movie.Year}`;
    movieTile.appendChild(movieTitle);
  
    movieList.appendChild(movieTile);
  
    const movieInfo = document.getElementById("movie-info");
    movieInfo.innerHTML = "";
  
    const movieInfoTitle = document.createElement("h3");
    movieInfoTitle.textContent = `${movie.Title} - ${movie.Year} - ${movie.Genre}`;
    movieInfo.appendChild(movieInfoTitle);
  
    const movieInfoPlot = document.createElement("p");
    movieInfoPlot.textContent = `${movie.Plot}`;
    movieInfo.appendChild(movieInfoPlot);
  }
  
  const searchTerm = window.location.search;
  const queryParams = new URLSearchParams(window.location.search);
  
  searchMovie(queryParams.get("imdbID"));
  
  // Add event listener to search input
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", (_) => {
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm === "") {
      alert("Enter a search term");
    }
    searchMovie(searchTerm);
  });
  