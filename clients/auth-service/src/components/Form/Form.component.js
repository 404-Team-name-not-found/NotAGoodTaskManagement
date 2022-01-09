import { injectHTMLToElement } from '../../utils/dom.service';
import './Form.style.css';


function Form({ injectTo }) {
  const FormTemplate = `
    <form id="form" class="form">
      <div class="form-control">
      <label for="username">Username</label>
      <input type="text" placeholder="Username" id="username" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      
      <div class="form-control">
      <label for="username">Email</label>
      <input type="email" placeholder="name@email.com" id="email" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>

      <div class="form-control">
      <label for="username">Password</label>
      <input type="password" placeholder="Password" id="password"/>
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>

      <div class="form-control">
      <label for="username">Password check</label>
      <input type="password" placeholder="Password two" id="password2"/>
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      <button><h1>Sumbit</h1></button>
    </form>
  `;

  injectHTMLToElement(FormTemplate, injectTo);
}

export default Form;