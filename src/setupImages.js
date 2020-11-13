const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
// script to
const sourcePath = 'src/media/raw/images'
const targetPath = 'public/media/images'
const targetParams = [
  ['micro-h', null, 40],
  ['thumb-w', 250, null],
  ['thumb-h', null, 250],
  ['medium-w', 640, null],
  ['medium-h', null, 480],
]
console.log('sourcePath =', sourcePath)
console.log('targetPath =', targetPath)
console.log('targetParams =', targetParams)

fs.readdir(sourcePath, async(err, files) => {
  if (err)
    throw err
  console.log(files)
  for (let filename of files) {
    for (let param of targetParams) {
      const [size, width, height] = param
      const sourceFilepath = path.join(sourcePath, filename)
      const targetFilepath = path.join(targetPath, `${filename.replace(/\.[a-zA-Z]+$/, '')}.${size}.jpg`)
      console.log(sourceFilepath, size, targetFilepath);
      await sharp(sourceFilepath)
       .resize({ width, height })
       .toFile(targetFilepath)
     }
  }
})