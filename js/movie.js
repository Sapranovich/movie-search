/* eslint-disable linebreak-style */
function fetchDetails() {
  const urlSearchMovie = `https://www.omdbapi.com/?apikey=10cd503f++&type=movie&i=${sessionStorage.getItem('movieId')}`;
  return fetch(urlSearchMovie).then((res) => res.json());
}
function renderPage(obj) {
  const html = `
   <div class="info-left">
   <div class="info-left-poster">
     <img src="${obj.Poster}" alt="No poster :((">
   </div>
   <div class="info-left-btn">
     <a class = 'btn-videogallery' href="https://www.imdb.com/title/${obj.imdbID}/videogallery/" target="_blank">Go to gallery</a>
     <a class = 'btn-close' href=""  onclick="window.close()">Сlose</a>
   </div>
 </div>
 <div class="info-right">
   <table border="0" width="100%" cellpadding="12">
     <tr>
      <span>Description</span>
     </tr>
     <tr>
      <td class="title-description">Title:</td>
      <td>${obj.Title}</td>
     </tr>
     <tr>
      <td class="title-description">Plot:</td>
      <td>${obj.Plot}</td>
    </tr>
     <tr>
     <td class="title-description">Actors:</td>
     <td>${obj.Actors}</td>
      </tr>
      <tr>
      <td class="title-description">Country:</td>
      <td>${obj.Country}</td>
      </tr>
    <tr>
      <td class="title-description">Genre:</td>
      <td>${obj.Genre}</td>
    </tr>
    <tr>
      <td class="title-description">Language:</td>
      <td>${obj.Language}</td>
    </tr>
    <tr>
      <td class="title-description">Ratings:</td>
      <td>${obj.imdbRating}/10</td>
    </tr>
    <tr>
      <td class="title-description">Website:</td>
      <td>${obj.Website}</td>
    </tr>
    <tr>
      <td class="title-description">imdbVotes:</td>
      <td>${obj.imdbVotes}</td>
    </tr>
   </table>
 </div>`;
  document.querySelector('.info').innerHTML = html;
}
fetchDetails().then(res=>renderPage(res));
