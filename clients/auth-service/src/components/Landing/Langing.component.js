import { injectHTMLToElement } from '../../utils/dom.service';
import './Landing.style.css';

function landingPage({ injectTo }) {
  const FormTemplate = `
  <div class="header">
  <div class="inner-header flex">

    <h1>Welcome To TaskApp</h1>
    <!-- <a href="../Sign-Up/signin.html"><button>Get Started</button></a> -->
    <button id="start">Get Started</button>
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
}

export default landingPage;