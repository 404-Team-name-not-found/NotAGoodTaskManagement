import { injectHTMLToElement } from "../../utils/dom.service";
import CardHeader from "../CardHeader/CardHeader.component";
import LoginForm from "../Form/Log-In/LoginForm.component";
import SignUpForm from "../Form/Sign-Up/SignUpForm.component";
import landingPage from "../Landing/Langing.component";
import './app.style.css';

const getCurrentLocation = () => window.location.href.split('/').pop();

function App({ injectTo }) {
  const currentLocation = getCurrentLocation();
  
  const appTemplate = `<div id="card-container" class="card-container"/>`;
  injectHTMLToElement(appTemplate, injectTo);
  const cardContainer = document.getElementById('card-container');
  console.log(currentLocation);
  switch (currentLocation) {
    case 'sign-up': {
      CardHeader({ injectTo: cardContainer, title: 'something' });
      SignUpForm({ injectTo: cardContainer });
      break;
    };

    case 'log-in': {
      CardHeader({ injectTo: cardContainer, title: 'something' });
      LoginForm({ injectTo: cardContainer });
      break;
    };

    case 'landing': {
      landingPage({ injectTo: cardContainer });
      break;
    };

    default: injectHTMLToElement('<h1>404 page not found</h1>', injectTo);
  }

};

export default App;