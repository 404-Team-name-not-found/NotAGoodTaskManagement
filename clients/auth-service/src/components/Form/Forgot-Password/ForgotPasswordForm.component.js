import { injectHTMLToElement } from "../../../utils/dom.service";
import "./ForgotPassword.style.css";
function ForgotPasswordForm({ injectTo }) {
  const FormTemplate = `
    <form id="form" class="form">
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
  const form = document.getElementById('form');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  };
  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  };
  const checkInputs = () => {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (passwordValue === '') {
      setErrorFor(password, 'Password cannot be blank');
    } else {
      setSuccessFor(password);
    }
    if(password2Value === '') {
      setErrorFor(password2, 'Password2 cannot be blank');
    } else if(passwordValue !== password2Value) {
      setErrorFor(password2, 'Passwords does not match');
    } else{
      setSuccessFor(password2);
    }
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkInputs();
  });

}
export default ForgotPasswordForm;