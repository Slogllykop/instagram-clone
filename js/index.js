'use-strict';

const USERNAME = 'myusername';
const PASSWORD = '1234';

const loginPage = document.querySelector('.login_container');

const loginUsername = document.querySelector('.inputted_username');
const loginPassword = document.querySelector('.inputted_password');

const loginButton = document.querySelector('.login_submit');
const loginForm = document.querySelector('.login_form');


const homePage = document.querySelector('.home_container');

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
    if (loginUsername.value === USERNAME && loginPassword.value === PASSWORD) {
        console.log('Login successful');
        loginPage.style.display = 'none';
        homePage.style.display = 'block';
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

// ===========================================================================================
// ===========================================================================================

// plox don't bully my key (request)
let key = "FLOnPA-x3biFG1Z9hCx5VBq2tfaEFIZip7U4AvKmHkc";

let keywords = ["supercars", "india", "hillstations", "tropical", "beach", "party", "cinematic", "travel", "tourist", "sunset", "nature", "random", "football", "photography", "programming", "coding", "gaming", "gaming%20pcs", "gaming%20setup", "landscape", "potraits", "bikes", "superbikes", "culture", ""];
let my = keywords[Math.floor(Math.random() * keywords.length)];

const numberOfPosts = 5;

let url = `https://api.unsplash.com/search/photos/?query=${my}&per_page=${numberOfPosts*2}&client_id=${key}`;
window.addEventListener("load", console.warn("API ==> ",url));

const postProfPic = document.querySelectorAll('.post_img_container');
const postUsername = document.querySelectorAll('.post_username');
const postPlace = document.querySelectorAll('.post_place');
const postImg = document.querySelectorAll('.post_container');
const postLikes = document.querySelectorAll('.likes_number');
const postCaptionUsername = document.querySelectorAll('.post_caption_username');
const postCaption = document.querySelectorAll('.post_caption');
const commentsCounter = document.querySelectorAll('.view_comments');
const postHours = document.querySelectorAll('.hours');

console.log(postImg, postUsername, postPlace);

fetch(url)
.then(response => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error("Request failed!");
    }
})
.then(data => {
    console.log(data);
    const imageNodes = [];
    const usernameNodes = [];
    const placeNodes = [];
    const ProfPicNodes = [];
    const hours = [];

    for (let i = 0; i < numberOfPosts; i++) {
        hours.push(Math.floor(Math.random() * 12) + 1);
    }

    hours.sort((a,b) => a -b);

    const imageUrls = data.results.map(result => result.urls.raw);

    console.log("Data ==> ", data.results);
    console.log("Images only ==> ", imageUrls);

    for(let i = 0; i < numberOfPosts; i++) {
        // main post imgage
        imageNodes[i] = document.createElement('img');
        imageNodes[i].src = data.results[i].urls.raw;
        postImg[i].appendChild(imageNodes[i]);

        // post username
        if (!(data.results[i].user.instagram_username === null)) {
            usernameNodes[i] = data.results[i].user.instagram_username;
            postUsername[i].textContent = usernameNodes[i];
            
            // post caption username
            postCaptionUsername[i].textContent = usernameNodes[i];
        }

        // post place
        if (!(data.results[i].user.location === null)) {
            placeNodes[i] = data.results[i].user.location;
            postPlace[i].textContent = placeNodes[i];
        }

        // post profile pic
        ProfPicNodes[i] = document.createElement('img');
        ProfPicNodes[i].src = data.results[i].user.profile_image.medium;
        postProfPic[i].appendChild(ProfPicNodes[i]);

        // post likes
        postLikes[i].textContent = data.results[i].likes;

        // post caption
        if (!(data.results[i].description === null)) {
            postCaption[i].textContent = data.results[i].description;
        }

        // comments counter
        const cmt_msg = `View all ${data.results[i].user.total_photos} comments`;
        commentsCounter[i].textContent = cmt_msg;

        // post hours
        const hours_msg = `${hours[i]} HOURS AGO`;
        postHours[i].textContent = hours_msg;
    }
})