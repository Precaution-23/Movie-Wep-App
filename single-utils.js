// defined constants 
const defaultImage = './images/default-image.jpg'
const defaultSummary = "This movie doesnt come with a summary plot because we want to keep patrons excited and eager to watch the movie. Anticipate!!!"


// function that gets the movies from the endpoint 
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
// function that triggers the endpoint to get movies
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
  movieImage.src = movie.Poster === "N/A" ? `${defaultImage}` : movie.Poster;
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

  const movieInfoTitle = document.createElement("h1");
  movieInfoTitle.textContent = `${movie.Title} - ${movie.Year}`;
  movieInfo.appendChild(movieInfoTitle);

  const movieGenre = document.createElement("h4");
  movieGenre.textContent = `Genre: ${movie.Genre}`;
  movieInfo.appendChild(movieGenre);

  const movieCast = document.createElement("h4");
  movieCast.textContent = ` Actors: ${movie.Actors}`;
  movieInfo.appendChild(movieCast);

  const movieInfoPlot = document.createElement("p");
  movieInfoPlot.textContent = movie.Plot === "N/A" ? `${defaultSummary}` : `Summary: ${movie.Plot}`;
  movieInfo.appendChild(movieInfoPlot);
}

const searchTerm = window.location.search;
const queryParams = new URLSearchParams(window.location.search);

searchMovie(queryParams.get("imdbID"));

