import { injectHTMLToElement } from '../../utils/dom.service';
import './DashboardTemplate.style.css';

function Dashboard({ injectTo, title }) {
const DashboardTemplate = `
    <div id="card-header" class="card__header" />
      <h2>${title}</h2>
    </div>
  `;
  injectHTMLToElement(DashboardTemplate, injectTo);
};

export default Dashboard;