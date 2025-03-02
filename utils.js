import fs from 'fs';

function readFiles(fileName) {
  try {
    const filePath = `./data/${fileName}.json`;
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    return parsedData;
  } catch (error) {
    console.log(`Error reading ${fileName}.json:`, error);
    return null;
  }
}

export default readFiles;