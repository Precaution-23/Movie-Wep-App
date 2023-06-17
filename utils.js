const url = "http://www.omdbapi.com/?apikey=b39ffab";
let page = 1;
let allMovies = [];

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

function searchMovie(searchTerm, page) {
  fetchMovies(searchTerm, page)
    .then((movies) => {
      if (movies.length < 1) {
        const noMovieView = document.getElementById("no-movie");
        noMovieView.hidden = false;
      }
      allMovies = movies;
      renderMovies(movies);
    })
    .catch((error) => {
      alert('Sorry an error occured. Please try again..')
    });
}

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
    movieImage.src = movie.Poster;
    movieImage.alt = movie.Title;
    movieImage.classList.add("movie-image");
    movieTile.appendChild(movieImage);

    const movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${movie.Title} - ${movie.Year}`;
    movieTile.appendChild(movieTitle);

    const viewMoreButton = document.createElement("a");
    viewMoreButton.classList.add("search-button");
    viewMoreButton.textContent = "View More";
    viewMoreButton.href = `single.html?imdbID=${movie.imdbID}`;
    movieTile.appendChild(viewMoreButton);

    movieList.appendChild(movieTile);
  }

  const viewMoreButton = document.createElement("button");
  viewMoreButton.textContent = "View More";
  viewMoreButton.id = "view-more";
  const searchInput = document.getElementById("search-input");
  viewMoreButton.addEventListener("click", (_) => {
    const searchTerm = searchInput.value.trim();
    page += 1;
    searchMovie(searchTerm, page);
  });

  movieList.appendChild(viewMoreButton);
}

function populateFilterDropdown(years) {
  const filterInput = document.getElementById("filter-input");
  for (let year of years) {
    var option = document.createElement("option");
    option.value = year;
    option.text = year;
    filterInput.appendChild(option);
  }
}

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

searchButton.addEventListener("click", (_) => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Enter a search term");
  }
  page = 1;
  searchMovie(searchTerm, 1);
});

filterInput.addEventListener("change", (event) => {
  const optionSelected = event.target.value;

  if (optionSelected === "undefined") {
    alert("Select year");
  }

  // page = 1;
  sortMovies(optionSelected);
});
