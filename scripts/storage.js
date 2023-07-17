"use strict";

function saveToStorage(key, arr) {
  return localStorage.setItem(key, JSON.stringify(arr));
}

function getFromStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}
