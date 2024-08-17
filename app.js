const express = require("express");
const path = require("path");
const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to check working hours
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send(
      "This web application is only available during working hours (Monday to Friday, from 9 to 17)."
    );
  }
});

// Routes
//Home page
app.get("/", (req, res) => {
  res.render("index");
});

//Our Services
app.get("/services", (req, res) => {
  res.render("services");
});

//Contact us
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
