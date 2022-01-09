import { injectHTMLToElement } from '../../utils/dom.service';
import './CardHeader.style.css';

function CardHeader({ injectTo, title }) {
  const CardHeaderTemplate = `
    <div id="card-header" class="card__header" />
      <h2>${title}</h2>
    </div>
  `;
  injectHTMLToElement(CardHeaderTemplate, injectTo);
};

export default CardHeader;