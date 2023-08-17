// data-fns
const { format } = require("date-fns");
// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// uuid
const { v4: uuid } = require("uuid");
// console.log(uuid());

// fs
const fs = require("fs");
const fsPromises = require("fs").promises;

// path
const path = require("path");

// logEvent function
const logEvents = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n\n`;
  console.log(logItem);

  // write log to txt by logEvent function
  path_name = "logs";
  try {
    // make dir if not exist
    // Note: mkdir at root dir, thus need to add ..
    if (!fs.existsSync(path.join(__dirname, "..", path_name))) {
      await fsPromises.mkdir(path.join(__dirname, "..", path_name));
    }
    await fsPromises.appendFile(
      // path.join(__dirname, "..", path_name, "eventLog.txt"),
      path.join(__dirname, "..", path_name, fileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// middlewarw logger
const logger = (req, res, next) => {
  // logEvents to log
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  //
  console.log(`${req.method} ${req.path}`);
  // pass down the control
  next();
};

// export
module.exports = { logger, logEvents };
