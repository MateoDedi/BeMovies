let swiper = new Swiper(".mySwiper", {
  slidesPerView: 4, // Show 4 slides at a time
  spaceBetween: 20, // Adjust the space between slides as needed
  navigation: {
    nextEl: ".swiper-button-next", // Next slide button
    prevEl: ".swiper-button-prev", // Previous slide button
  },
});

let swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 4, // Show 4 slides at a time
  spaceBetween: 20, // Adjust the space between slides as needed
  navigation: {
    nextEl: ".swiper-button-next2", // Next slide button
    prevEl: ".swiper-button-prev2", // Previous slide button
  },
});

let swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 4, // Show 4 slides at a time
  spaceBetween: 20, // Adjust the space between slides as needed
  navigation: {
    nextEl: ".swiper-button-next2", // Next slide button
    prevEl: ".swiper-button-prev2", // Previous slide button
  },
});

//MODAL DISPLAY AND HIDE

let openModalRegister = document.querySelector(".open-modal");
let openModalSignin = document.querySelector(".openModal");
let modal = document.querySelector("#myModal");
let quitModal = document.querySelector(".close");
openModalRegister.addEventListener("click", () => {
  modal.classList.toggle("active");
  loginButton.classList.add("selected");
});
openModalSignin.addEventListener("click", () => {
  modal.classList.toggle("active");
  signupButton.classList.add("selected");
});
quitModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// MODAL TOGGLE BACKGROUND

let loginButton = document.querySelector(".left");
let signupButton = document.querySelector(".right");
loginButton.addEventListener("click", () => {
  loginButton.classList.add("selected");
  signupButton.classList.remove("selected");
});
signupButton.addEventListener("click", () => {
  loginButton.classList.remove("selected");
  signupButton.classList.add("selected");
});

let inputUsername = document.querySelector(".txt");
let inputPassword = document.querySelector(".pass");
let form = document.querySelector("form");
let username = "";
let password = "";

inputUsername.addEventListener("input", (e) => {
  username = e.target.value;
});
inputPassword.addEventListener("input", (e) => {
  password = e.target.value;
});

form.addEventListener("change", (e) => {
  e.preventDefault();
  console.log(`Username : ${username}`);
  console.log(`Password : ${password}`);
});

// FETCH SEARCH INPUT

document.addEventListener("DOMContentLoaded", function () {
  let genres = {
    id28: "Action",
    id12: "Adventure",
    id16: "Animation",
    id35: "Comedy",
    id80: "Crime",
    id99: "Documentary",
    id18: "Drama",
    id10751: "Family",
    id14: "Fantasy",
    id36: "History",
    id27: "Horror",
    id10402: "Music",
    id9648: "Mystery",
    id10749: "Romance",
    id878: "Science Fiction",
    id10770: "TV Movie",
    id53: "Thriller",
    id10572: "War",
    id37: "Western",
  };
  let genreFunc = (element) => {
    let arrayOfGenre = element.genre_ids;
    let movieGenre = [];
    arrayOfGenre.forEach((cat) => {
      movieGenre.push(genres[`id${cat}`]);
    });
    movieGenre = movieGenre.toString();
    movieGenre = movieGenre.replaceAll(",", " / ");
    return movieGenre;
  };

 
  function createMoviePosterElement(
    posterUrl,
    movieId,
    title,
    releaseDate,
    voteAverage,
    overview,
    genre
  ) {
    const img = document.createElement("img");
    img.classList.add("movie-poster");
    img.classList.add("poster-image");
    img.src = posterUrl;

    img.addEventListener("click", () => {
      selectedPosterUrl = posterUrl;
      selectedMovieId = movieId;
      const popup = document.querySelector(".popup");
      if (popup) {
        popup.classList.remove("hidden");
        const posterImg = document.querySelector(".posterImg");
        const titleElement = document.querySelector(".textPop h2");
        const yearElement = document.querySelector(".textPop p");
        const averageElement = document.querySelector(".textPop span");
        const genreElement = document.querySelector(".genres");
        const overviewElement = document.querySelector(".resume");

        if (posterImg) {
          posterImg.src = posterUrl;
        }
        if (titleElement) {
          titleElement.textContent = title;
        }
        if (yearElement) {
          yearElement.textContent = releaseDate.slice(0, 4);
        }
        if (averageElement) {
          averageElement.textContent = voteAverage.toFixed(1);
        }
        if (overviewElement) {
          overviewElement.textContent = overview;
        }
        if (genreElement) {
          genreElement.textContent = genre;
        }
      }
    });

    return img;
  }

  function populateSwiperWithMovies(moviesData, swiperContainer) {
    const swiperContainerElement = document.querySelector(
      `.${swiperContainer}`
    );
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    for (const movie of moviesData) {
      if (movie && movie.poster_path) {
        const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const moviePoster = createMoviePosterElement(
          posterUrl,
          movie.id,
          movie.title,
          movie.release_date,
          movie.vote_average,
          movie.overview,
          genreFunc(movie)
        );

        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        swiperSlide.appendChild(moviePoster);
        swiperWrapper.appendChild(swiperSlide);
      }
    }

    swiperContainerElement.innerHTML = "";

    swiperContainerElement.appendChild(swiperWrapper);

    new Swiper(`.${swiperContainer}`, {});
  }

  //  fetch movies by genres

  async function fetchMoviesByGenre(genreId, swiperContainer) {
    try {
      const apiUrlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&with_genres=${genreId}&sort_by=popularity.desc
      `;

      const response = await fetch(apiUrlGenre);
      if (!response.ok) {
        throw new Error("Réponse du réseau non valide");
      }

      const data = await response.json();

      populateSwiperWithMovies(data.results, swiperContainer);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films par genre :",
        error
      );
    }
  }

  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("change", (e) => {
    const searchResult = e.target.value;
    fetchMovies(searchResult);
  });

  // fetch movies by result

  async function fetchMovies(searchResult) {
    try {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${searchResult}&language=fr-FR&sort_by=popularity.desc`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Réponse du réseau non valide");
      }

      const data = await response.json();

      populateSwiperWithMovies(data.results, "swiper1");
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  }

  // Fetch latest releases

  async function fetchLatestReleases() {
    const today = new Date();
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const apiUrlLatest = `https://api.themoviedb.org/3/discover/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR&sort_by=popularity.desc&primary_release_date.gte=${oneMonthAgo
      .toISOString()
      .slice(0, 10)}&primary_release_date.lte=${today
      .toISOString()
      .slice(0, 10)}
`;

    try {
      const response = await fetch(apiUrlLatest);
      if (!response.ok) {
        throw new Error("Réponse du réseau non valide");
      }

      const data = await response.json();

      populateSwiperWithMovies(data.results, "swiper2");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des dernières sorties :",
        error
      );
    }
  }

  // FETCHDISPLAY ON CLICK BY GENRES ( FETCH ALREADY CALL FOR COMEDY )

  document
    .getElementById("comedy")
    .addEventListener("click", () => fetchMoviesByGenre(35, "swiper3"));
  document
    .getElementById("drama")
    .addEventListener("click", () => fetchMoviesByGenre(18, "swiper3"));
  document
    .getElementById("action")
    .addEventListener("click", () => fetchMoviesByGenre(28, "swiper3"));
  document
    .getElementById("romance")
    .addEventListener("click", () => fetchMoviesByGenre(10749, "swiper3"));
  document
    .getElementById("fantasy")
    .addEventListener("click", () => fetchMoviesByGenre(14, "swiper3"));
  document
    .getElementById("animation")
    .addEventListener("click", () => fetchMoviesByGenre(16, "swiper3"));
  fetchMoviesByGenre(35, "swiper3");
  fetchLatestReleases();
});

// FUNCTION FOR RED BACKGROUND ON DIFFERENTS LI

const genreItems = document.querySelectorAll(".genre-table li");
genreItems.forEach((item) => {
  item.addEventListener("click", function () {
    genreItems.forEach((item) => {
      item.classList.remove("redBgGenres");
    });
    item.classList.add("redBgGenres");
  });
});

// FETCH SEARCH INPUT

    let searchInput = document.querySelector(".search-input");
    let searchResult = "";
    searchInput.addEventListener("change", (e) => {
      searchResult = e.target.value;
    //   fetchMovies();
    });
    let swiperWrapper = document.querySelector('.swiper-wrapper')

    async function fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${searchResult}&language=fr-FR`
      )
        .then((res) => res.json())
        .then((data) => {
          const moviesData = data.results; 
        });
    }

