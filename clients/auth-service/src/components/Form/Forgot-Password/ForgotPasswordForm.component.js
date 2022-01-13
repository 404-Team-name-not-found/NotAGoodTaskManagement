import { injectHTMLToElement } from '../../../utils/dom.service';
import "./ForgotPasswordForm.style.css";
const isPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
function ForgotPasswordForm({ injectTo }) {
  const FormTemplate = `
  <form id="form" class="form">
      <div class="input-field">
      <label for="username">Password</label>
      <input type="password" placeholder="Password" id="password"/>
      <i class="checkcircle"></i>
      <i class="exclamationcircle"></i>
      <small>Error message</small>
      </div>

      <div class="input-field">
      <label for="username">Password check</label>
      <input type="password" placeholder="Password two" id="password2"/>
      <i class="checkcircle"></i>
      <i class="exclamationcircle"></i>
      <small>Error message</small>
      </div>
      <button><h1>Submit</h1></button>
    </form>
  `;

  injectHTMLToElement(FormTemplate, injectTo);
 
  const form = document.getElementById('form');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-field error';
    small.innerText = message;
  };

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'input-field successful';
};
const checkInputs = () => {
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if(passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else if (!isPassword(passwordValue)){
    setErrorFor(password, 'Not a valid password');
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