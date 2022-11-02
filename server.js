const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000

const data = JSON.parse(fs.readFileSync('web.json', 'utf-8'));
// data.forEach(element => {
//   console.log(element.string);
// });

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { inputData: data });
})


app.get('/add', (req, res) => {
  res.render('add');
})

app.post('/add', (req, res) => {

  data.push({
    string: req.body.String,
    integer: req.body.Integer,
    float: req.body.Float,
    date: req.body.Date,
    boolean: req.body.Boolean
  });
  fs.writeFileSync("web.json", JSON.stringify(data, null, 3), "utf-8");
  res.redirect("/");

})

app.get("/delete/:id", (req, res) => {
  const index = req.params.id
  data.splice(index, 1);
  fs.writeFileSync("web.json", JSON.stringify(data, null, 3), "utf-8");
  res.redirect("/");
})

app.get("/edit/:id", (req, res) => {
  const index = req.params.id
  res.render("edit", { item: data[index] });
})

app.post("/edit/:id", (req, res) => {
  const index = req.params.id
  data[i] = {
    string: req.body.String,
    integer: req.body.Integer,
    float: req.body.Float,
    date: req.body.Date,
    boolean: req.body.Boolean
  }
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
})