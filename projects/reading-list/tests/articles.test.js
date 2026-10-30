import test from "node:test";
import assert from "node:assert/strict";
import { STORAGE_KEY, createArticle, loadArticles, normalizeUrl, saveArticles } from "../articles.js";

function memoryStorage() {
  const items = new Map();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
  };
}

test("a new browser has an empty list", () => {
  assert.deepEqual(loadArticles(memoryStorage()), []);
});

test("article creation trims titles and normalizes web addresses", () => {
  const article = createArticle("  OpenCode docs  ", " https://opencode.ai ");
  assert.equal(article.title, "OpenCode docs");
  assert.equal(article.url, "https://opencode.ai/");
  assert.ok(article.id);
  assert.notEqual(createArticle("Other", "https://example.com").id, article.id);
});

test("empty and oversized titles are rejected", () => {
  for (const title of ["", "  ", "x".repeat(201)]) {
    assert.throws(() => createArticle(title, "https://example.com"));
  }
});

test("only public-format HTTP and HTTPS links are accepted", () => {
  for (const url of ["example.com", "javascript:alert(1)", "file:///etc/passwd", "https://user:pass@example.com"]) {
    assert.throws(() => normalizeUrl(url));
  }
  assert.equal(normalizeUrl("http://example.com/path?q=1#section"), "http://example.com/path?q=1#section");
});

test("saving and reloading preserves article data and order", () => {
  const storage = memoryStorage();
  const articles = [createArticle("A", "https://example.com/a"), createArticle("B", "https://example.com/b")];
  saveArticles(storage, articles);
  assert.deepEqual(loadArticles(storage), articles);
  saveArticles(storage, articles.filter((article) => article.id !== articles[0].id));
  assert.deepEqual(loadArticles(storage), [articles[1]]);
  saveArticles(storage, []);
  assert.deepEqual(loadArticles(storage), []);
});

test("invalid saved data is reported without overwriting it", () => {
  const storage = memoryStorage();
  const article = createArticle("A", "https://example.com");
  for (const saved of ["broken", "null", "{}", "[null]", JSON.stringify([article, article]),
    JSON.stringify([{ ...article, url: "javascript:alert(1)" }])]) {
    storage.setItem(STORAGE_KEY, saved);
    assert.throws(() => loadArticles(storage));
    assert.equal(storage.getItem(STORAGE_KEY), saved);
  }
});

test("storage errors are not reported as successful saves", () => {
  assert.throws(() => saveArticles({ setItem() { throw new Error("quota exceeded"); } }, []), /quota/);
});
