const express = require("express");
const { google } = require("googleapis");
const app = express(); // run the function to create a express app
const port = 4000;

app.set("view engine", "ejs");

app.set("view engine", "ejs");

// app.get("/", async (req, res) => {
//   res.render("index");
// });
// app.get("/portfolio", async (req, res) => {
//   res.render("portfolio");
// });
// app.get("/about", async (req, res) => {
//   res.render("about");
// });

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1upiscciyDs2WiD0ed7YHx57ckJ8ALvuaC4krTcI2pkE";

  // Get metaData about spreedsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read row from Spreadsheet
  const homepage = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Homepage",
  });
  const portfolio = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Portfolio Page",
  });
  const about = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "About Page",
  });

  // Render the homepage template with the Google Sheets data
  res.render("index", { homepageData: homepage.data.values });
});

app.get("/portfolio", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1upiscciyDs2WiD0ed7YHx57ckJ8ALvuaC4krTcI2pkE";

  // Get metaData about spreedsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read row from Spreadsheet
  const homepage = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Homepage",
  });
  const portfolio = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Portfolio Page",
  });
  const about = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "About Page",
  });

  // Render the portfolio template with the Google Sheets data
  res.render("portfolio", { portfolioData: portfolio.data.values });
});

app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});
