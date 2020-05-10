/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class Slider {
  renderPage(wordSearch, number) {
    Slider.translate(wordSearch)
      .then((word) => Slider.searchMovies(word, number))
      .then((movies) => Slider.addDetails(movies))
      .then((movies) => {
        return movies.map((movie) => Slider.errorLink(movie));
      })
      .then((movies) => Slider.renderSlider(movies))
      .then(ok=>Slider.mark(sessionStorage.getItem('NameFilm')))
      .then((ok) => Slider.settingsSlider())
      .catch((error) =>{
        console.log(`No results were found for "${wordSearch}"`);
        document.getElementById('search-result').innerHTML = `No results were found for "${wordSearch}"`;
        document.getElementById('preloader').style.display = 'none';
      });
  }


  static translate(wordSearch) {
    const yandexKey = 'trnsl.1.1.20200508T114229Z.a17f916eb7b10e01.f0c16f20280fc1bd1fe94c3ddbf5d34984a82b61';
    return fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&text=${wordSearch}&lang=ru-en&format=text`
    )
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem('NameFilm', data.text[0]);
        return data.text[0].split(' ').join('_');
      });
  }

  static searchMovies(word, number) {
    document.getElementById('preloader').style.display = 'inline-block';
    const urlSearchMovies = 'https://www.omdbapi.com/?apikey=10cd503f++&type=movie&s=';
    return fetch(urlSearchMovies + word + `&page=${number}`)
      .then((res) => res.json())
      .then((json) => json.Search);
  }

  static addDetails(movies) {
    return Promise.all(
      movies.map((movie) => Slider.fetchDetails(movie).then((details) => ({ ...movie, details })))
    );
  }

  static fetchDetails(movie) {
    const urlSearchMovie = 'https://www.omdbapi.com/?apikey=10cd503f++&type=movie&i=';
    return fetch(urlSearchMovie + movie.imdbID).then((res) => res.json());
  }

  static errorLink(movie) {
    if (movie.Poster == 'N/A') movie.Poster = '';
    return movie;
  }

  static renderSlider(movies) {
    const htmlSlides = movies.map((movie) => Slider.renderMovie(movie));
    const htmlSlider = `    
  <div class="swiper-container">
  <div class="swiper-wrapper">
     ${htmlSlides.join('')}
  </div>

  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</div>`;
    document.getElementById('content').innerHTML = htmlSlider;
    document.getElementById('preloader').style.display = 'none';
  }

  static mark(word) {
    document.getElementById('search-result').innerHTML = `Showing results for "${sessionStorage.getItem('NameFilm')}"`;
  }

  static renderMovie(movie) {
    return `
  <div class='swiper-slide'>
  <div class="slider-item-link"><a href="https://www.imdb.com/title/${movie.imdbID}/videogallery/">${movie.Title}</a></div>
  <img class="slider-item-poster" src="${movie.Poster}" alt="No poster">
  <a class ='btn-info' onclick="openInfoFilm('${movie.imdbID}')">Details</a>
  <div class="slider-item-age">Age:${movie.Year}</div>
  <div class="slider-item-rating" data = '${movie.imdbID}'>
      Rating:${movie.details.imdbRating}
  </div>     
</div>
  `;
  }
  
  static addSlidesInSlider(movies) {
    document.getElementById('preloader').style.display = 'none';
    const htmlSlides = movies.map((movie) => Slider.renderMovie(movie));
    return htmlSlides;
  }


  static settingsSlider() {
    let counterPage = 2;
    let swiper = new Swiper('.swiper-container', {
      initialSlide: 1,
      breakpoints: {
        320: {
          initialSlide: 0,
          centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 30
        },
        720: {
          initialSlide: 0,
          centeredSlides: true,
          slidesPerView: 2,
          spaceBetween: 50
        },
        1024: {
          initialSlide: 1,
          centeredSlides: true,
          slidesPerView: 3,
          spaceBetween: 30
        },
        1280: {
          initialSlide: 1,
          centeredSlides: true,
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
    swiper.on('slideChange', function () {
      if (swiper.activeIndex > swiper.slides.length - 2) {
        Slider.searchMovies(sessionStorage.getItem('NameFilm'), counterPage)
          .then((movies) => Slider.addDetails(movies))
          .then((movies) => {
            return movies.map((movie) => Slider.errorLink(movie));
          })
          .then((movies) => Slider.addSlidesInSlider(movies))
          .then(html=>swiper.appendSlide(html))
          .catch((error) =>{
            document.getElementById('search-result').innerHTML = `Showing all films for: "${sessionStorage.getItem('NameFilm')}"`;
            document.getElementById('preloader').style.display = 'none';
          });
        counterPage++;
      }
    });
  }
}

export default Slider;
