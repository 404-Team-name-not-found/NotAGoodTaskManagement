import { injectHTMLToElement } from '../../../utils/dom.service';
import './LoginForm.style.css';


function LoginForm({ injectTo }) {
  const FormTemplate = `
  <form action="#">
    <div class="field username-field">
        <div class="input">
        <input type="text" placeholder="Username">
        </div>
        <div class="error error-text">Username field cant be empty</div>
        <div class="error2 invalid-text">Invalid letters inserted</div>
    </div>
    <div class="password-field">
        <div class="input">
        <input type="password" placeholder="Password">
        </div>
        <div class="error error-text">Password field cant be empty</div>
    </div>
    <div class="field password-link"><a href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjD49mX65r1AhXMTsAKHapaDXoQPAgI">Forgot password?</a></div>
    <input type="submit" value="Login">
</form>
  `;

  injectHTMLToElement(FormTemplate, injectTo);

  
}

export default LoginForm;