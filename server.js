const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

const upload = multer({
  dest: "./uploads",
})

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/users', function (req, res) {
  fs.readFile('users.json', 'utf8', ((err, data) => {
    res.end(data)
  }))
})

app.post("/upload",(req, res) => {
  fs.appendFile("file.txt", res.send)

});

app.get("/upload", ((req, res) => {
  res.send("Hello from outer space.")
}))

app.listen(port, () => {
  console.log(`Server now listens to port ${port}`);
});
