import { injectHTMLToElement } from "../../utils/dom.service";
import landingPage from "../Landing/Langing.component";
import './app.style.css';

function App({ injectTo }) {
  const appMain = `<div id="main-page" class="main-page"/>`;
  injectHTMLToElement(appMain, injectTo);
  
  const mainPage = document.getElementById('main-page');
  landingPage({ injectTo: mainPage });
}

export default App;