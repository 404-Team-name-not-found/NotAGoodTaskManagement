import { injectHTMLToElement } from '../../../utils/dom.service';
import './SignUpForm.style.css';

function SignUpForm({ injectTo }) {
  const FormTemplate = `
    <form id="form" class="form">
      <div class="input-field">
      <label for="username">Username</label>
      <input type="text" placeholder="Username" id="username" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      
      <div class="input-field">
      <label for="username">Email</label>
      <input type="email" placeholder="name@email.com" id="email" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>

      <div class="input-field">
      <label for="username">Password</label>
      <input type="password" placeholder="Password" id="password"/>
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>

      <div class="input-field">
      <label for="username">Password check</label>
      <input type="password" placeholder="Password two" id="password2"/>
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      <button><h1>Submit</h1></button>
    </form>
  `;

  injectHTMLToElement(FormTemplate, injectTo);
 
  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
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
  formControl.className = 'form-control success';
};

const isEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const checkInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  
  if(usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank');
  } else {
    setSuccessFor(username);
  }

  if(emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
  }

  if(passwordValue === '') {
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

export default SignUpForm;