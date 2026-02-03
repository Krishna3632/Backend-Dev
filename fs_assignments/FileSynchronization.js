// fileSync.js
const fs = require("fs");
const path = require("path");

function syncDirs(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      syncDirs(srcPath, destPath);
    } else {
      if (
        !fs.existsSync(destPath) ||
        fs.statSync(srcPath).mtimeMs > fs.statSync(destPath).mtimeMs
      ) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Synced: ${srcPath}`);
      }
    }
  }
}

const sourceDir = process.argv[2];
const targetDir = process.argv[3];

if (!sourceDir || !targetDir) {
  console.log("Usage: node fileSync.js <source> <destination>");
  process.exit(1);
}

syncDirs(sourceDir, targetDir);