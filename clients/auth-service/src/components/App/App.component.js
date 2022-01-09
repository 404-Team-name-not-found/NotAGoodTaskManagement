import { injectHTMLToElement } from "../../utils/dom.service";
import CardHeader from "../CardHeader/CardHeader.component";
import Form from "../Form/Form.component";
import './app.style.css';

const getCurrentLocation = () => window.location.href.split('/').pop();

function App({ injectTo }) {
  const currentLocation = getCurrentLocation();
  
  const appTemplate = `<div id="card-container" class="card-container"/>`;
  injectHTMLToElement(appTemplate, injectTo);
  const cardContainer = document.getElementById('card-container');
  console.log(currentLocation);
  switch (currentLocation) {
    case 'log-in': {
      CardHeader({ injectTo: cardContainer, title: 'something' });
      Form({ injectTo: cardContainer });
      break;
    };

    case 'sign-up': {
      CardHeader({ injectTo: cardContainer, title: 'something' });
      break;
    };

    default: injectHTMLToElement('<h1>404 page not found</h1>', injectTo);
  }

};

export default App;