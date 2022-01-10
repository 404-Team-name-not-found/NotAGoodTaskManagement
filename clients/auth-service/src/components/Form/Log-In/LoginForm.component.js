import { injectHTMLToElement } from '../../../utils/dom.service';
import './LoginForm.style.css';


function LoginForm({ injectTo }) {
  const FormTemplate = `
  <form action="#">
          <div class="container">
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
        <div class="field signup-link">Dont have an acount yet ?<a href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjD49mX65r1AhXMTsAKHapaDXoQPAgI">Sign up</a></div>
      </form>
  `;

  injectHTMLToElement(FormTemplate, injectTo);

  const form = document.querySelector("form"),
userNameField = form.querySelector(".username-field"),
userNameInput = userNameField.querySelector("input"),
passwordField = form.querySelector(".password-field"),
passwordInput = passwordField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();
  
  if(userNameInput.value === ''){
    userNameField.classList.add("error");
  }
  else{
    userNameField.classList.remove("error");
  }
  
  if(!usernameLetterValid(userNameInput.value.trim())){
    userNameField.classList.add("error2")
  }
  else{
    userNameField.classList.remove("error2");
  }

  if(passwordInput.value === ''){
    passwordField.classList.add("error");
  }
  else{
    passwordField.classList.remove("error");
  }

  if(userNameInput.value != '' && passwordInput.value != '' && usernameLetterValid(userNameInput.value.trim())){
    landingPage();
  }

  
}

function landingPage(){
  window.location.href = "https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjD49mX65r1AhXMTsAKHapaDXoQPAgI";
}

function usernameLetterValid(username){
  return /^[A-Za-z0-9]*$/.test(username);
}
}

export default LoginForm;