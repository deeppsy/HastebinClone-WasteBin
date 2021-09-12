const express = require("express");
// const express = require("express")

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const code = `Welcome to WasteBin!

Use the commands in the top right corner
to create a new file to share with others`;

  res.render("code-display", { code });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", (req, res) => {
  const { value } = req.body;

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
