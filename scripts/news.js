"use strict";

let currentPage = 1;
let pageSize, category, totalResults, pageNum;

// SELECTION --------------------------------------------------------------------
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNumEl = document.getElementById("page-num");
const paginationEl = document.getElementById("news-pagination");

// FUNCTIONS --------------------------------------------------------------------
//#region RENDER ARTICLE CARD
function renderArticleCard(res) {
  res.articles.forEach((a) => {
    const el = document.createElement("div");
    el.innerHTML = `<div class="card flex-row flex-wrap">
                    <div class="card mb-3" style="">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img src=${a.urlToImage}
                          class="card-img"
                          alt=${a.title}>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">${a.title}</h5>
                            <p class="card-text">${a.description}</p>
                            <a href=${a.url}
                            class="btn btn-primary">View</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
    newsContainer.append(el);
  });
}
//#endregion

//#region RENDER ARTICLES
async function renderArticles(pageSize, currentPage) {
  try {
    const res = await currentUser[0].getNews(
      "us",
      "26742ede11704f10b9bf50c290356591",
      pageSize,
      currentPage,
      category
    );

    // Get total results & total page number
    console.log(res);
    totalResults = res.totalResults;
    pageNum = Math.ceil(totalResults / pageSize);

    // Render articles
    newsContainer.innerHTML = "";
    renderArticleCard(res);

    // Update page number in navigation
    pageNumEl.textContent = currentPage;

    // Hide previous/next button in special cases
    if (currentPage === 1) prevBtn.classList.add("hide");
    else prevBtn.classList.remove("hide");
    if (currentPage === pageNum) nextBtn.classList.add("hide");
    else nextBtn.classList.remove("hide");
  } catch (err) {
    console.error(err);
  }
}
//#endregion

// EVENT HANDLERS ---------------------------------------------------------------
// LOAD DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function () {
  // Get current user
  const objectcurrentUser = getFromStorage("currentUser", []);
  currentUser = objectcurrentUser.map((obj) => parseUser(obj));
  pageSize = currentUser[0]?.pageSize;
  category = currentUser[0]?.category;

  // Guard clause: return when user logged out
  if (currentUser.length === 0) {
    const alert = document.createElement("div");
    alert.innerHTML = `<div class="text-center">Please login to see news</div>`;
    newsContainer.append(alert);
    return;
  }

  // Show pagination
  paginationEl.classList.remove("hide");

  // Show news articles
  renderArticles(pageSize, currentPage);
});

// CLICKING PREV BUTTON
prevBtn.addEventListener("click", function () {
  currentPage--;
  if (currentPage < 1) return (currentPage = 1);
  renderArticles(pageSize, currentPage);
});

// CLICKING NEXT BUTTON
nextBtn.addEventListener("click", function () {
  currentPage++;
  if (currentPage > pageNum) return (currentPage = pageNum);
  renderArticles(pageSize, currentPage);
});
