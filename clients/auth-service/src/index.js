import App from "./components/App/App.component";
import './index.css';

const root = document.getElementById('root');

window.addEventListener('load', () => App({ injectTo: root }));
