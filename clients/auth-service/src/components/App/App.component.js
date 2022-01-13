import { injectHTMLToElement } from "../../utils/dom.service";
import CardHeader from "../CardHeader/CardHeader.component";
import ForgotPasswordForm from "../Form/Forgot-Password/ForgotPasswordForm.component";
import LoginForm from "../Form/Log-In/LoginForm.component";
import SignUpForm from "../Form/Sign-Up/SignUpForm.component";
import './app.style.css';

const getCurrentLocation = () => window.location.href.split("/").pop();

function App({ injectTo }) {
  // const currentLocation = getCurrentLocation();
  const currentLocation = "forgot-password";
  const appTemplate = `<div id="card-container" class="card-container"/>`;
  injectHTMLToElement(appTemplate, injectTo);
  const cardContainer = document.getElementById('card-container');
  switch (currentLocation) {
    case 'sign-up': {
      CardHeader({ injectTo: cardContainer, title: 'Create Account' });
      SignUpForm({ injectTo: cardContainer });
      break;
    };

    case 'log-in': {
      CardHeader({ injectTo: cardContainer, title: 'Login' });
      LoginForm({ injectTo: cardContainer });
      break;
    };

    case "forgot-password": {
      CardHeader({ injectTo: cardContainer, title: "Forgot Password" });
      ForgotPasswordForm({ injectTo: cardContainer });
      break;
    }
    default: injectHTMLToElement('<h1>404 page not found</h1>', injectTo);
  }

};

export default App;