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