import { createArticle, loadArticles, saveArticles } from "./articles.js";

const form = document.querySelector("#article-form");
const titleInput = document.querySelector("#article-title");
const urlInput = document.querySelector("#article-url");
const list = document.querySelector("#article-list");
const error = document.querySelector("#error");
const announcement = document.querySelector("#announcement");
let articles = [];

function showError(message) {
  error.textContent = message;
  error.hidden = false;
}

function updateArticles(nextArticles, message) {
  try {
    saveArticles(localStorage, nextArticles);
  } catch {
    showError("Could not save changes. Check that browser storage is available, then try again.");
    return false;
  }
  articles = nextArticles;
  error.hidden = true;
  renderArticles();
  announcement.textContent = message;
  return true;
}

function renderArticles() {
  list.replaceChildren();
  document.querySelector("#empty-state").hidden = articles.length > 0;
  document.querySelector("#article-count").textContent =
    `${articles.length} ${articles.length === 1 ? "article" : "articles"}`;
  for (const article of articles) {
    const item = document.createElement("li");
    item.className = "article";
    const info = document.createElement("div");
    info.className = "article-info";
    const link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = article.title;
    const domain = document.createElement("p");
    domain.className = "article-domain";
    domain.textContent = new URL(article.url).hostname;
    info.append(link, domain);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "delete-button";
    removeButton.title = `Remove ${article.title}`;
    removeButton.setAttribute("aria-label", `Remove ${article.title}`);
    const icon = document.createElement("img");
    icon.src = "assets/trash-2.svg";
    icon.alt = "";
    removeButton.append(icon);
    removeButton.addEventListener("click", () => {
      const index = articles.findIndex((entry) => entry.id === article.id);
      if (updateArticles(articles.filter((entry) => entry.id !== article.id), "Article removed.")) {
        const buttons = list.querySelectorAll("button");
        (buttons[Math.min(index, buttons.length - 1)] ?? titleInput).focus();
      }
    });
    item.append(info, removeButton);
    list.append(item);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let article;
  try {
    article = createArticle(titleInput.value, urlInput.value);
  } catch (issue) {
    showError(issue.message);
    return;
  }
  if (updateArticles([...articles, article], "Article saved.")) {
    form.reset();
    titleInput.focus();
  }
});

try {
  articles = loadArticles(localStorage);
  renderArticles();
} catch {
  document.querySelector("#empty-state").hidden = true;
  document.querySelector("#article-count").textContent = "Unavailable";
  form.querySelector("button").disabled = true;
  showError("Saved articles could not be loaded. Existing browser data has not been changed.");
}
