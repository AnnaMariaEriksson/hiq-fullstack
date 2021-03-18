const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/upload')

app.listen(port, () => {
  console.log(`Server now listens to port ${port}`);
});
