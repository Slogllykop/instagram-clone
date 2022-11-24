'use-strict';

const USERNAME = 'admin';
const PASSWORD = '1234';

const loginPage = document.querySelector('.login_container');

const loginUsername = document.querySelector('.inputted_username');
const loginPassword = document.querySelector('.inputted_password');

const loginButton = document.querySelector('.login_submit');
const loginForm = document.querySelector('.login_form');


function checkLength() {
    if (loginUsername.value.length !== 0 && loginPassword.value.length >= 4) {
        console.log("user:", loginUsername.value.length, "pass:", loginPassword.value.length);
        loginButton.disabled = false;
        loginButton.style.cursor = "pointer";
        loginButton.style.backgroundColor = "rgb(0, 149, 246)";
    } else {
        loginButton.disabled = true;
        loginButton.style.cursor = "not-allowed";
        loginButton.style.backgroundColor = "rgb(178, 223, 252)";
    }
}

loginForm.addEventListener("keyup", checkLength)

const login = () => {
    console.log(loginUsername.value.length, loginPassword.value.length);
    if (loginUsername.value === USERNAME && loginPassword.value === PASSWORD) {
        console.log('Login successful');
        loginPage.style.display = 'none';
    } else {
        console.log('Login failed');
        document.querySelector('.wrong_message').style.display = "block";
        loginUsername.value = "";
        loginPassword.value = "";
        loginButton.disabled = true;
        loginButton.style.cursor = "not-allowed";
        loginButton.style.backgroundColor = "rgb(178, 223, 252)";
    }
}