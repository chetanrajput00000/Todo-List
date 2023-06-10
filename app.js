const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const date=require(__dirname  +"/date.js")

const port = 3000

const app = express();
let moreItem = ["Buy Food", "Cook Food", "Eat Food"];
let workItem = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


app.get("/", function (req, res) {

  let day= date.getDate();

  res.render("list", { kindOfDay: day, newItems: moreItem });

});


app.post("/", function (req, res) {

  let item = req.body.newItems;

  if (req.body.list === "work") {

    workItem.push(item);
    res.redirect("/work");
  } else {

    moreItem.push(item);
    res.redirect("/");
  }

});


app.get("/work", function (req, res) {
  res.render("list", { kindOfDay: "work list", newItems: workItem });
});

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
});

