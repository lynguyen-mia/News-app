"use strict";

// SELECTION --------------------------------------------------------------------
const mainContent = document.getElementById("main-content");
const loginModal = document.getElementById("login-modal");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

// EVENT HANDLERS ---------------------------------------------------------------
// LOAD DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function () {
  // Get user array
  const objectUserArr = getFromStorage("userArray", []);
  userArr = objectUserArr.map((obj) => parseUser(obj));
  // Get current users
  currentUser = getFromStorage("currentUser", []);
  // Show customized interface to users
  if (currentUser.length === 0) {
    loginModal.classList.remove("hide");
  } else {
    mainContent.classList.remove("hide");
    welcomeMessage.append(`Welcome ${currentUser[0].firstName}`);
  }
});

// CLICKING LOG OUT
logoutBtn.addEventListener("click", function () {
  // Delete current user
  currentUser = [];
  saveToStorage("currentUser", currentUser);
  // Redirect to login page
  window.location.href = "../pages/login.html";
});
