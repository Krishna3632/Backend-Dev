// logAnalyzer.js
const fs = require("fs");
const readline = require("readline");

const filePath = "application.log";

const counts = {
  INFO: 0,
  WARN: 0,
  ERROR: 0,
};
let totalLines = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  totalLines++;
  if (line.includes("INFO")) counts.INFO++;
  else if (line.includes("WARN")) counts.WARN++;
  else if (line.includes("ERROR")) counts.ERROR++;
});

rl.on("close", () => {
  console.log("Log Summary");
  console.log("-----------");
  console.log("Total Lines:", totalLines);
  console.log("INFO:", counts.INFO);
  console.log("WARN:", counts.WARN);
  console.log("ERROR:", counts.ERROR);
});