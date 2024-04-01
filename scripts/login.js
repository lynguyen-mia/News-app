"use strict";

// SELECTION --------------------------------------------------------------
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");
const form = document.querySelector("form");

// EVENT HANDLERS ---------------------------------------------------------
//#region CLICKING LOGIN BUTTON
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Validate data
  if (!inputUsername.value || !inputPassword.value) {
    alert("Please input all fields.");
  } else {
    userArr.forEach((obj) => {
      // Check if username and password are correct
      if (
        inputUsername.value === obj.username &&
        inputPassword.value === obj.password
      ) {
        // Generate current user array
        currentUser = [];
        currentUser.push(obj);
        saveToStorage("currentUser", currentUser);

        // Direct to homepage
        isLogin = true;
        window.location.href = "../index.html";
      }
    });
    // Alert login fails
    if (!isLogin) alert("Wrong username or password!");

    // Clear form inputs
    form.reset();
  }
});
//#endregion

// LOAD DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function () {
  // Get user array
  const objectUserArr = getFromStorage("userArray", []);
  userArr = objectUserArr.map((obj) => parseUser(obj));
});
