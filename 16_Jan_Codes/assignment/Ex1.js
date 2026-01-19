const fs = require('fs');

fs.readFile('in.txt', 'utf8', (e, d) => {
  if (e) return;
  const wc = d.trim().split(/\s+/).length;
  fs.writeFile('out.txt', wc.toString(), () => {});
});