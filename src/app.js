const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../puplic");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: " Yasser Khallaf",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
    return;
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    img: "/img/Robot.png",
    name: "Yasser Khallaf",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    message: "This a help page ",
    name: "Yasser Khallaf",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must set address",
    });
    return;
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error,
        });
        return;
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          res.send({
            error,
          });
          return;
        }
        res.send({
          forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not found Page",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Not found Page",
    errorMessage: "Not found page",
  });
});

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Yasser",
//       age: 27,
//     },
//     {
//       name: "Tasnim",
//       age: 6,
//     },
//   ]);
// });
// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({
//     location: "Cairo",
//     forecast: 50,
//   });
// });
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
