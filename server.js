const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyparser = require("body-parser");

const connectmongo = require("./server/database/connectiondb")



const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 5000;

// parser request to bady-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// mongoDb connection
connectmongo();

// Static files
app.use(express.static("assets"));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Templating Engine
// app.use(expressLayouts);
// app.set("layout", "./layout/main");

// set view engine
app.set("view engine", "ejs");

// load routers
app.use("/", require("./server/routes/router"));

// Enable CORS for all routes
app.use(cors());

// home
// app.get("/", (req, res) => {
//   res.send("hellooooo");
// });

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
