// sub directory

const express = require("express");
const router = express();
const path = require("path");

// routing
// adding some regex: ^/|/index(.html)? -> with / only or /index or /index.html
router.get("^/$|/index(.html)?", (req, res) => {
  // method 1: using option to specify root dir
  //   res.sendFile("./views/index.html", { root: __dirname });
  // method 2: using path.join to specify root
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// export
module.exports = router;
