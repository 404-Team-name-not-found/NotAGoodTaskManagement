import { injectHTMLToElement } from "../../utils/dom.service";
import CardHeader from "../CardHeader/CardHeader.component";
import LoginForm from "../Form/Log-In/LoginForm.component";
import SignUpForm from "../Form/Sign-Up/SignUpForm.component";
import landingPage from "../Landing/Langing.component";
import './app.style.css';

const getCurrentLocation = () => window.location.href.split('/').pop();

function App({ injectTo }) {
  const currentLocation = 'landing';
  
  const appTemplate = `<div id="card-container" class="card-container"/>`;
  const appMain = `<div id="landing" class="landing"/>`;

  console.log(currentLocation);
  switch (currentLocation) {
    case 'sign-up': {
      injectHTMLToElement(appTemplate, injectTo);
      const cardContainer = document.getElementById('card-container');
      CardHeader({ injectTo: cardContainer, title: 'something' });
      SignUpForm({ injectTo: cardContainer });
      break;
    };

    case 'log-in': {
      injectHTMLToElement(appTemplate, injectTo);
      const cardContainer = document.getElementById('card-container');
      CardHeader({ injectTo: cardContainer, title: 'something' });
      LoginForm({ injectTo: cardContainer });
      break;
    };

    case 'landing': {
      injectHTMLToElement(appMain, injectTo);
      const mainPage = document.getElementById('landing');
      landingPage({ injectTo: mainPage });
      break;
    };

    default: injectHTMLToElement('<h1>404 page not found</h1>', injectTo);
  }

};

export default App;