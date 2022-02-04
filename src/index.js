const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./configs/db");
const route = require("./routes");
const adminRoute = require("./routes/admin");

const app = express();
const admin = express();
dotenv.config();
db.connectDB();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(cors());

adminRoute(admin);
route(app, admin);

app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
