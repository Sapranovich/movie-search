/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import HeaderFooter from './components/header_footer';
import Search from './components/search.js';
import Slider from './components/slider.js';

const header_footer = new HeaderFooter();
const search = new Search();
const slider = new Slider();
header_footer.render();
search.render();
search.request();
slider.renderPage('home', 1);

export default slider;
