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


   
  