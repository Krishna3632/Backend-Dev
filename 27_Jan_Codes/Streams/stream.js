const fs = require('fs');
const path = require('path');
const inputFilePath = path.join(__dirname, '../data/input.txt');
const outputFilePath = path.join(__dirname, '../data/output.txt');

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    const upperCaseChunk = chunk.toUpperCase();
    writeStream.write(upperCaseChunk);
});

readStream.on('end', () => {
    writeStream.end();
    console.log('File transformation complete.');
});

readStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});

writeStream.on('finish',()=>{
    console.log("Finished");
})