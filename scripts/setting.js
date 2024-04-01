"use strict";

// SELECTION -------------------------------------------------------------------
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const saveSettingBtn = document.getElementById("btn-submit");
const settingAlert = document.getElementById("setting-alert");

// EVENT HANDLERS --------------------------------------------------------------
// SHOW CURRENT SETTINGS WHEN LOADING PAGE
window.addEventListener("load", function () {
  // Get user array
  const objectUserArr = getFromStorage("userArray", []);
  userArr = objectUserArr.map((obj) => parseUser(obj));

  // Get current user
  const objectcurrentUser = getFromStorage("currentUser", []);
  currentUser = objectcurrentUser.map((obj) => parseUser(obj));

  // Display current settings
  inputPageSize.value = currentUser[0]?.pageSize || 5;
  inputCategory.value = currentUser[0]?.category || "General";
});

// SAVE SETTINGS
saveSettingBtn.addEventListener("click", function () {
  // Validate input
  if (!inputPageSize.value || !inputCategory.value) {
    return alert("Please input settings!");
  }
  // Save settings in current user
  currentUser[0].pageSize = inputPageSize.value;
  currentUser[0].category = inputCategory.value;
  saveToStorage("currentUser", currentUser);

  // Save settings in user array (to keep settings when logging out)
  const objectToBeReplaced = userArr.find(
    (user) =>
      user.username === currentUser[0].username &&
      user.password === currentUser[0].password
  );
  Object.assign(objectToBeReplaced, currentUser[0]);
  saveToStorage("userArray", userArr);

  // Alert settings saved
  settingAlert.innerHTML = "";
  settingAlert.insertAdjacentHTML("afterbegin", "SETTINGS SAVED!");
  setTimeout(() => (settingAlert.innerHTML = ""), 3000);
});
