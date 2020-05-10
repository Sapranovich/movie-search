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
        <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/movie-search.md">Task reference</a>
        <a href="https://github.com/Sapranovich">My GitHub</a>
      </div>
   </div>`;
  }
}

export default HeaderFooter;
