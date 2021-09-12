const express = require("express");
// const express = require("express")

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("code-display");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
