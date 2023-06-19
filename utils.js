// defined constants 
const url = "http://www.omdbapi.com/?apikey=b39ffab";
const defaultImage = './images/default-image.jpg'


let allMovies = [];
const noMovieView = document.getElementById("no-movie");
const loadingMovie = document.getElementById("loading");
loadingMovie.hidden = true;


// function that gets the movies from the endpoint 
async function fetchMovies(searchTerm, page = 1) {
  const apiUrl = `${url}&s=${searchTerm}&page=${page}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    alert('Sorry an error occured. Please try again..')
    return null;
  }
}

// function that triggers the endpoint to get movies
function searchMovie(searchTerm, page) {
    noMovieView.hidden = true;
    loadingMovie.hidden = false
  fetchMovies(searchTerm, page)
    .then((movies) => {
      if (movies.length < 1) {
        noMovieView.hidden = false;
      }
      loadingMovie.hidden = true;
      allMovies = movies;
      renderMovies(movies);
    })
    .catch((error) => {
        loadingMovie.hidden = true;
      alert('Sorry an error occured. Please try again..')
      
    });
}

// the function that gets the movie list snd renders it
function renderMovies(movies) {
  const movieList = document.getElementById("movie-list");
  const vMore = document.getElementById("view-more");
  if (page === 1) {
    movieList.innerHTML = "";
  }

  if (vMore) {
    vMore.remove();
  }

  for (let movie of movies) {
    const noMovieView = document.getElementById("no-movie");
    if (noMovieView) {
      noMovieView.remove();
    }

    const movieTile = document.createElement("div");
    movieTile.classList.add("movie-tile");

    const movieImage = document.createElement("img");
    movieImage.src = movie.Poster === "N/A" ? `${defaultImage}` : movie.Poster;
    movieImage.alt = movie.Title;
    movieImage.classList.add("movie-image");
    movieTile.appendChild(movieImage);

    const movieTitle = document.createElement("div");
    const movieYear = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieYear.classList.add("movie-year");
    movieTitle.textContent = ` Title: ${movie.Title}`;
    movieYear.textContent = `Year: ${movie.Year}`;
    movieTile.appendChild(movieTitle);
    movieTile.appendChild(movieYear);

    const viewMoreButton = document.createElement("a");
    viewMoreButton.classList.add("single-button");
    viewMoreButton.textContent = "View More";
    viewMoreButton.href = `singleView.html?imdbID=${movie.imdbID}`;
    movieTile.appendChild(viewMoreButton);

    movieList.appendChild(movieTile);
  }

  const brEl = document.getElementById("main-container");

  const viewMoreButton = document.createElement("button");
  viewMoreButton.textContent = "Load More";
  viewMoreButton.id = "view-more";
  viewMoreButton.classList.add("view-more-btn")
  const searchInput = document.getElementById("search-input");

  // the view more methods that gets more related movies
  viewMoreButton.addEventListener("click", (_) => {
    const searchTerm = searchInput.value.trim();
    page += 1;
    searchMovie(searchTerm, page);
  });

  brEl.appendChild(viewMoreButton);
}

// function to sort movies on ascending or descending order based on year
function sortMovies(sortBy) {
  const filteredMovies =
    sortBy === "asc"
      ? allMovies.sort((a, b) => a.Year - b.Year)
      : allMovies.sort((a, b) => b.Year - a.Year);
  renderMovies(filteredMovies);
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const filterInput = document.getElementById("filter-input");

// method that gets the tltle and feeds to the function to get movies
searchButton.addEventListener("click", (_) => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Enter a search term");
  } else {
    page = 1;
    searchMovie(searchTerm, 1);
  }
});


// method that initiates the filter for sorting through list of movies 
filterInput.addEventListener("change", (event) => {
  const optionSelected = event.target.value;

  if (optionSelected === "select") {
    alert("Select an option");
  }

  sortMovies(optionSelected);
});

