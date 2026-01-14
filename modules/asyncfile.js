// const { add,remove,aoc }=require("./math")
// console.log(add(1,4),remove(1,5),aoc(4));
const fs = require("fs");
const Logger = require("./logger");

// Initialize logger
const logger = new Logger("./logs/activity.log");

// Synchronous file write operation with logging
try {
  fs.writeFileSync("./text.txt", "This is Sync file content");
  logger.log("writeFileSync", {
    fileName: "text.txt",
    content: "This is Sync file content",
    operation: "write"
  }, "success");
} catch (error) {
  logger.logError("writeFileSync", error, {
    fileName: "text.txt"
  });
}

// Asynchronous file read operation with logging
const asyncFile = fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error in the file reading", err);
    logger.logError("readFile", err, {
      fileName: "text.txt",
      operation: "read"
    });
  } else {
    console.log("File reading successfully.", data);
    logger.log("readFile", {
      fileName: "text.txt",
      fileContent: data,
      operation: "read"
    }, "success");
  }
});