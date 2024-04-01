"use strict";

let userArr = [];
let currentUser = [];
let isLogin = false;

// CREATE CLASS USER
class User {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize || 5;
    this.category = category || "General";
  }

  async getNews(country, apiKey, pageSize, page, category) {
    try {
      const articles = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&category=${category}&apiKey=${apiKey}`
      );
      const response = await articles.json();
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

// PARSE USER OBJECTS TO CLASS INSTANCES
// Data is saved in local storage under the form of object, not class instance
// => use this function to retrieve all instance methods when getting data from storage
function parseUser(dataObj) {
  const user = new User(
    dataObj.firstName,
    dataObj.lastName,
    dataObj.username,
    dataObj.password,
    dataObj.pageSize,
    dataObj.category
  );
  return user;
}
