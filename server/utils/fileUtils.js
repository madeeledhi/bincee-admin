// libs
import {
  existsSync, readdirSync, readFile, writeFile,
} from 'fs'

export const getFilesInDirectory = dirPath => new Promise((resolve, reject) => {
  if (existsSync(dirPath)) {
    return resolve(readdirSync(dirPath))
  }

  return reject()
})

export const getFileContent = filePath => new Promise((resolve, reject) => {
  if (existsSync(filePath)) {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  }
})

export const readJSONFile = filePath => getFileContent(filePath).then(data => JSON.parse(data))

export const writeJSONFile = (fileName, data) => new Promise((resolve, reject) => {
  writeFile(fileName, JSON.stringify(data), 'utf8', err => {
    if (err) reject(err)
    else resolve(data)
  })
})
