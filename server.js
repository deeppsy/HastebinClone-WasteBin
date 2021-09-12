const express = require("express");
const mongoose = require("mongoose");

const Document = require("./models/Document");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/wastebin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((e) => {
    console.log("Oh No, Mongo Connection Error", e);
  });

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

app.post("/save", async (req, res) => {
  const { value } = req.body;

  try {
    const document = await Document.create({ value });
    console.log(document);
    res.redirect(`/${document.id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value });
  } catch (error) {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
