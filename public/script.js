const form = document.getElementById("bookmarkForm");
const bookmarkList = document.getElementById("bookmarkList");

const API = "/api/bookmarks";

async function fetchBookmarks() {
  const res = await fetch(API);
  const data = await res.json();

  bookmarkList.innerHTML = "";

  data.forEach(bookmark => {
    const div = document.createElement("div");
    div.className = "bookmark";

    div.innerHTML = `
      <strong>${bookmark.title}</strong><br/>
      <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
      <div class="actions">
        <button onclick="editBookmark(${bookmark.id})">Edit</button>
        <button class="delete" onclick="deleteBookmark(${bookmark.id})">Delete</button>
      </div>
    `;

    bookmarkList.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, url })
  });

  form.reset();
  fetchBookmarks();
});

async function deleteBookmark(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchBookmarks();
}

async function editBookmark(id) {
  const newTitle = prompt("Enter new title:");
  const newUrl = prompt("Enter new URL:");

  if (!newTitle || !newUrl) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, url: newUrl })
  });

  fetchBookmarks();
}

fetchBookmarks();