// import logEvents
const { EventEmitter } = require("stream");
const logEvents = require("./middleware/logEvents");

// Event Emmiter
const eventEmmiter = require("events");
class MyEmmiter extends EventEmitter {}
// initialize object
const myEmmiter = new MyEmmiter();

// add listener for the log event
myEmmiter.on("log", (msg) => {
  logEvents(msg);
});

// setTimeour on emmiting event
setTimeout(() => {
  // Emit event
  myEmmiter.emit("log", "Log event emmitted!");
}, 2000);
