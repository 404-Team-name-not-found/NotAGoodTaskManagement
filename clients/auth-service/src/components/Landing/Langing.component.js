import { injectHTMLToElement, replaceElementInnerHTML } from '../../utils/dom.service';
import CardHeader from '../CardHeader/CardHeader.component';
import LoginForm from '../Form/Login/LoginForm.component';
import SignUpForm from '../Form/SignUp/SignUpForm.component';
import './Landing.style.css';

function landingPage({ injectTo }) {
  const popupHeader = "Login"
  const FormTemplate = `
  <div class="header">
    <div class="inner-header flex">
      <h1>Welcome To TaskApp</h1>
      <!-- <a href="../Sign-Up/signin.html"><button>Get Started</button></a> -->
      <button id="start">Get Started</button>
      <div class="popup" id="myPopup">
        <button class="exit "id="end">X</button>
        <div id="popup-header"></div>
        <div id="popup-main"></div>
        <div id="popup-footer">
        </div>
      </div>
    </div>
  <!--Waves Container-->
  <div>
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#F9F9F9" />
      </g>
    </svg>
  </div>
  <!--Waves end-->

</div>
<!--Header ends-->
  `;

  injectHTMLToElement(FormTemplate, injectTo);

  const Header = document.getElementById('popup-header')
  const Main = document.getElementById('popup-main')
  const Footer = document.getElementById('popup-footer')

  const start = document.getElementById('start')
  const end = document.getElementById('end')
 
  start.onclick = () => {
    const popup = document.getElementById("myPopup")
    popup.classList.toggle("show")
    CardHeader ({ injectTo: Header , title: 'Login' },)
    LoginForm ({ injectTo: Main })
    const reset = document.getElementById('reset')
    const signup = document.getElementById('sign-up')

    reset.onclick = () => {
      Header.innerHTML = ""
      Main.innerHTML = ""
      CardHeader ({ injectTo: Header , title: 'Reset Password' },)
      ResetPassword ({ injectTo: Main })
    }
    signup.onclick = () => {
      Header.innerHTML = ""
      Main.innerHTML = ""
      CardHeader ({ injectTo: Header , title: 'Sign Up' },)
      SignUpForm ({ injectTo: Main })
    }
  }
  end.onclick = () => {
        window.location.reload();
    }
  

}

export default landingPage;