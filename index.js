const express = require("express");
const { google } = require("googleapis");
const app = express(); // run the function to create a express app
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
