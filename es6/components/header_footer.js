/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable class-methods-use-this */
class HeaderFooter {
  render() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer'); 
    header.innerHTML = `<a href="index.html">MovieSearch</a>`;
    footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <a href="https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating">IMDb "Top 1000"</a>
        <a href="https://www.rottentomatoes.com/top/bestofrt/">Best of Rotten Tomatoes</a>
        <a href="https://github.com/Sapranovich">My GitHub</a>
      </div>
   </div>`;
  }
}

export default HeaderFooter;
