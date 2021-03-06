const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const port = 3000;

app.use(bodyparser.json());
const mysql = require("mysql");
// not the safest way to store credentials, so sorry. Would've used env file for this if I could.
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "hiq"
});
dotenv.config();

const util = require("util");
db.connect = util.promisify(db.connect);
db.query = util.promisify(db.query);

//post file content to db
app.post("/files", async (request, response) => {
  console.log(request.body)
  let result = await db.query("INSERT INTO hiq.files SET ?", request.body)
  response.json(result);
});

//Get all the content
app.get("/files", async (request, response) => {
// return the latest row in the DB.
  let data = await db.query("SELECT * FROM hiq.files ORDER BY id DESC LIMIT 1;");
    response.json(data)
});

app.listen(port, async () => {
  await db.connect();
  console.log(`Server now listens to port ${port}`);
});
