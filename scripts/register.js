"use strict";

//#region SELECTION ----------------------------------------------
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const registerBtn = document.getElementById("btn-submit");
const form = document.querySelector("form");
//#endregion

// FUNCTIONS -----------------------------------------------------
//#region VALIDATE INPUT DATA
function validateData(data) {
  // Không có trường nào bị bỏ trống
  // prettier-ignore
  if (!data.firstName || !data.lastName || !data.username || !data.password || !inputPasswordConfirm.value) {
    alert("Please fill out all fields");
    return false;
  }
  // Username không được trùng với Username của các người dùng trước đó
  const duplicateUsername = userArr.some(
    (obj) => obj.username === data.username
  );
  if (duplicateUsername) {
    alert("Username already existed. Please input another one.");
    return false;
  }
  // Password và Confirm Password phải giống nhau
  if (data.password !== inputPasswordConfirm.value) {
    alert("Password and Confirm Password must be the same.");
    return false;
  }
  // Password phải có nhiều hơn 8 ký tự
  if (data.password.length < 8) {
    alert("Password must have more than 8 characters.");
    return false;
  }
  return true;
}
//#endregion

// EVENT HANDLERS -------------------------------------------------
//#region REGISTER BUTTON: get form inputs
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const data = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );

  // Validate data
  const validate = validateData(data);
  if (validate) {
    // Add new user to user array
    userArr.push(data);
    // Save user array to local storage
    saveToStorage("userArray", userArr);
    // Direct to login page
    window.alert("Register succeeded!");
    window.location.href = "../pages/login.html";
  }
});
//#endregion

//#region LOAD DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function () {
  const objectUserArr = getFromStorage("userArray", []);
  // Convert returned objects to class instances to include methods in instances
  userArr = objectUserArr.map((obj) => parseUser(obj));
});
//#endregion
