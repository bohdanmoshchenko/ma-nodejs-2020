const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(process.cwd(), outputDirName, outputFileName);

function getErrorMessage(error) {
  return `Error ${error.name}:${error.message} e.stack`;
}

async function getInputFileList() {
  let files = [];
  try {
    files = await fsp.readdir(inputDirName);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
  return files.map(fileName => path.join(inputDir, fileName));
}

async function getObjectFromFile(filePath) {
  let compressedBuffer = {};
  try {
    compressedBuffer = await fsp.readFile(filePath);
  } catch (error) {
    throw new Error(`When read file: ${filePath} ${getErrorMessage(error)}`);
  }
  let jsonBuffer = {};
  try {
    jsonBuffer = await gunzip(compressedBuffer);
  } catch (error) {
    throw new Error(`When unzip file from Buffer: ${getErrorMessage(error)}`);
  }
  const json = jsonBuffer.toString();
  let object;
  try {
    object = JSON.parse(json);
  } catch (error) {
    throw new Error(`When parse JSON: ${getErrorMessage(error)}`);
  }
  return object;
}

function rebuildUrl(originalUrl) {
  const url = new URL(originalUrl);
  url.protocol = 'https:';
  const names = originalUrl.split('/');
  const lastElement = names[names.length - 1];
  const nameWitExtension = lastElement.split('.');
  const name = nameWitExtension[0];
  const extension = nameWitExtension[1];
  const href = `${url.href.replace(lastElement, '')}?file=${name}&type=${extension}`;
  url.href = href;
  return url.href;
}

async function buildOutputObject(files) {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const object = await getObjectFromFile(file);
    object.url = rebuildUrl(object.url);
    const name = path.basename(file.toLowerCase(), '.json.gz');
    result[name] = object;
  }
  return result;
}

async function saveOutput(object) {
  let json = {};
  try {
    json = JSON.stringify(object);
  } catch (error) {
    throw new Error(`When parse JSON: ${getErrorMessage(error)}`);
  }
  const jsonBuffer = Buffer.from(json);
  let compressedBuffer = {};
  try {
    compressedBuffer = await gzip(jsonBuffer);
  } catch (error) {
    throw new Error(`When zip JSON buffer: ${getErrorMessage(error)}`);
  }
  try {
    await fsp.writeFile(outputFile, compressedBuffer);
  } catch (error) {
    throw new Error(`When write zip to file ${outputFile}: ${getErrorMessage(error)}`);
  }
}

async function start() {
  let inputFiles = {};
  try {
    inputFiles = await getInputFileList();
  } catch (error) {
    throw new Error(`When get input files: ${getErrorMessage(error)}`);
  }
  let outputObject = {};
  try {
    outputObject = await buildOutputObject(inputFiles);
  } catch (error) {
    throw new Error(`When build output object: ${getErrorMessage(error)}`);
  }
  try {
    await saveOutput(outputObject);
  } catch (error) {
    throw new Error(`When parse JSON: ${getErrorMessage(error)}`);
  }
}

start().catch(err => console.error('🐞  🤪  🐛\n', err));
