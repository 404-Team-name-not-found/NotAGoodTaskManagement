import axios from "axios";

const signupUsername = document.getElementById('username');
const signupPassword = document.getElementById('password');
const signupEmail = document.getElementById('email');
const signupSubmitButton = document.getElementById('submit');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginSubmitButton = document.getElementById('login-submit');
const forgotPasswordNew = document.getElementById('new-password');
const forgotPasswordSubmitButton = document.getElementById('forgot-submit');

const postLoginData = () => {
    axios.post('/', {
        username: loginUsername.innerHTML,
        password: loginPassword.innerHTML
      })
      .then(function (response) {
        console.log(response);
        window.location = '/landingpage';
      })
      .catch(function (error) {
        console.log(error);
        alert('Details not match');
      });
    }

    loginSubmitButton.addEventListener('click',postLoginData);

const postSignupData = () => {
    axios.post('/', {
        username: signupUsername.innerHTML,
        email: signupEmail.innerHTML,
        password: signupPassword.innerHTML,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    signupSubmitButton.addEventListener('click',postSignupData);

const postForgotPasswordData = () => {
    axios.post('/' , {
        password: forgotPasswordNew.innerHTML
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

forgotPasswordSubmitButton.addEventListener('click',postForgotPasswordData);