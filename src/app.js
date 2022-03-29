const express = require("express");
var session = require("express-session");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(
  session({
    secret: "hpm-secret-code",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.use(cors());
app.use(express.static(__dirname + "/public"));

/*Routers used*/
const nonauthRoutes = require("./routes/nonauthRoutes");
const authenticatedRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const invoicesRoutes = require("./routes/invoices/invoicesRoutes");

/*Images upload */
app.use(morgan("dev"));
const storage = multer.diskStorage({
  //destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    //date numbers + file extension
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

/*Routes*/
app.use("/", nonauthRoutes);
app.use("/", authenticatedRoutes);
app.use("/api/", apiRoutes);
app.use("/api/", invoicesRoutes);

/* Invalid routes final middleware */
app.use(function (_, res) {
  res.json({ status: "inexistent" });
});

module.exports = app;
