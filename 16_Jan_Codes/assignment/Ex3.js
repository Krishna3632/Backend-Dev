const os = require('os');
const fs = require('fs');

function log() {
  const i = `
${new Date().toLocaleString()}
${os.platform()}
${os.cpus()[0].model}
${(os.totalmem()/1e9).toFixed(2)} GB
${(os.freemem()/1e9).toFixed(2)} GB
-----------------
`;
  fs.appendFile('sys.log', i, () => {});
}

setInterval(log, 5000);