/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable space-before-blocks */
/* eslint-disable class-methods-use-this */

import slider from '../index.js';
class Search {
  render() {
    const searchContainer = document.getElementById('search');
    searchContainer.innerHTML = `
     <div id='search'>
     <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
       <div class="navbar-collapse" id="navbarColor02">
         <form class="form-inline" id = 'searchForm'>
           <input class="form-control" id = 'searchText' type="text" placeholder="Search movie" autocomplete="off" autofocus>
           <div class="lds-ring" id='preloader'><img src="./js/ajax-loader.gif" alt=""></div>
           <button class="clear-btn" type="button" onclick="document.getElementById('searchText').value=''"></button>
           <button class="btn btn-secondary my-2" type="submit">Search</button>
         </form>
       </div>
     </nav>
    </div>`;
  }

  request() {
    let FORM = document.getElementById('searchForm');
    let INPUT = document.getElementById('searchText');
    FORM.addEventListener('submit', (event)=>{
      event.preventDefault();
      if (INPUT.value != ''){
        if (isNaN(INPUT.value)) slider.renderPage(INPUT.value, 1);
      }
    });
  }
}

export default Search;
