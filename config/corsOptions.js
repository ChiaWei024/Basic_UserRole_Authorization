// white list for cors
const whiteListForCORS = [
  // any of yourwebsite that is allowed
  "https://www.mysite.com",
  "http://localhost:3500",
  "https://www.google.com",
];
// cors option setting
const corsOptions = {
  origin: (origin, callback) => {
    // note: !origin is for if the origin is undefined during developement
    if (whiteListForCORS.indexOf(origin) !== -1 || !origin) {
      // if (whiteListForCORS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors."));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
