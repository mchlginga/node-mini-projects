# Mini Static Server

- It serves static files like index.html, .css, .js using node.js.

- It checks MIME type of file.

- There is a fallback 404.html if the file doesn't exists.

---

## Code Flow

1. Create a basic HTTP server.
2. Inside, get the url (req.url) and map it to filename.
3. Use path + fs to find and read files.
4. Set the content-type using path.extname() at MIME map.
5. If the file cannot be found, serve a custom 404.html
6. Add sub-routing (/about, /contact).

---

