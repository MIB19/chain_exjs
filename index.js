const express = require("express");
const app = express();
var cors = require('cors')
const port = 9396;
const getLogin = require("./routes/login");

var allowlist = ['http://localhost:9396', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/login", cors(corsOptionsDelegate), getLogin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});