const express = require("express");
const { google } = require("googleapis");
const app = express();
const path = require("path");

const port = 4000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const client = async () => {
  return await auth.getClient();
};

const googleSheets = google.sheets({ version: "v4" });

// ID to specific Google Sheet
const spreadsheetId = "1upiscciyDs2WiD0ed7YHx57ckJ8ALvuaC4krTcI2pkE";

//Refactored code below to DRY
// Get data from Google sheet
const getSheetData = async (range) => {
  const authClient = await client();
  const data = await googleSheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId,
    range,
  });
  return data.data.values;
};

// Routes pulling Google Sheets data
app.get("/", async (req, res) => {
  const homepageData = await getSheetData("Homepage");
  res.render("index", { homepageData });
});

app.get("/portfolio", async (req, res) => {
  const portfolioData = await getSheetData("Portfolio Page");
  res.render("portfolio", { portfolioData });
});

app.get("/about", async (req, res) => {
  const aboutData = await getSheetData("About Page");
  res.render("about", { aboutData });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
