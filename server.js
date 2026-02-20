const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let bookmarks = [];
let idCounter = 1;

// Add Bookmark
app.post("/api/bookmarks", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ message: "Title and URL required" });
  }

  const newBookmark = { id: idCounter++, title, url };
  bookmarks.push(newBookmark);

  res.status(201).json(newBookmark);
});

// Get All Bookmarks
app.get("/api/bookmarks", (req, res) => {
  res.json(bookmarks);
});

// Update Bookmark
app.put("/api/bookmarks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, url } = req.body;

  const bookmark = bookmarks.find(b => b.id === id);
  if (!bookmark) {
    return res.status(404).json({ message: "Bookmark not found" });
  }

  bookmark.title = title || bookmark.title;
  bookmark.url = url || bookmark.url;

  res.json(bookmark);
});

// Delete Bookmark
app.delete("/api/bookmarks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  bookmarks = bookmarks.filter(b => b.id !== id);
  res.json({ message: "Bookmark deleted" });
});
app.get("/", (req, res) => {
  res.send("Smart Bookmark App is Live 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});