const express = require("express");
const dotenv = require("dotenv");

const db = require("./db");
const route = require("./routes");
const app = express();

dotenv.config();

db.connectDB();

const port = process.env.PORT || 3000;

route(app);

app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
