export const STORAGE_KEY = "reading-list.articles";

export function normalizeUrl(value) {
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("Enter a full URL starting with https:// or http://.");
  }
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("Use an http:// or https:// URL without a username or password.");
  }
  return url.href;
}

export function createArticle(title, url) {
  const cleanTitle = title.trim();
  if (!cleanTitle || cleanTitle.length > 200) {
    throw new Error("Enter a title between 1 and 200 characters.");
  }
  return { id: crypto.randomUUID(), title: cleanTitle, url: normalizeUrl(url) };
}

export function loadArticles(storage) {
  const saved = storage.getItem(STORAGE_KEY);
  if (saved === null) return [];
  const articles = JSON.parse(saved);
  const ids = new Set();
  if (!Array.isArray(articles) || !articles.every((article) => {
    if (!article || typeof article.id !== "string" || !article.id || ids.has(article.id)
      || typeof article.title !== "string" || !article.title.trim()
      || typeof article.url !== "string") return false;
    ids.add(article.id);
    try {
      normalizeUrl(article.url);
      return true;
    } catch {
      return false;
    }
  })) throw new Error("Saved articles have an invalid format.");
  return articles;
}

export function saveArticles(storage, articles) {
  storage.setItem(STORAGE_KEY, JSON.stringify(articles));
}
