import path from 'path'
import fs from 'fs'

// DEBUGGING
import Debug from 'debug'
const debug = Debug('data-source')

let getSources = function () {
  const dirPath = path.join(__dirname, 'data-sources');
  return new Promise((resolve, reject) => {
    const files = fs.readdirSync(dirPath)
      .map(file => path.join(dirPath, file))
      .filter(path => fs.statSync(path).isDirectory());
    const dirNames = files.map(file => file.split(path.sep).pop());
    debug('dirNames', dirNames);
    resolve(dirNames);
  })
}

export {
  getSources
}