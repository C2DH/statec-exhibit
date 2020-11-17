const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
// script to
const sourcePath = 'src/media/raw/images'
const targetPath = 'public/media/images'
const mediaUrl = '/media/images'
const mediaIndexPath = 'src/media/index.json'
const targetParams = [
  ['thumb-w', 250, null],
  ['thumb-h', null, 250],
  ['medium-w', 640, null],
  ['medium-h', null, 480],
]
console.log('sourcePath =', sourcePath)
console.log('targetPath =', targetPath)
console.log('mediaUrl =', mediaUrl)
console.log('targetParams =', targetParams)
console.log('mediaIndexPath =', mediaIndexPath)

fs.readdir(sourcePath, async(err, files) => {
  if (err)
    throw err
  console.log(files)
  const mediaIndex = {
    images: {}
  }
  for (let filename of files) {
    const sourceFilepath = path.join(sourcePath, filename)
    mediaIndex.images[filename] = {
      resolutions: {}
    }
    await sharp(sourceFilepath)
      .resize({ height: 20 })
      .toFormat('png')
      .blur(.3)
      .toBuffer()
        .then((data) => {
          mediaIndex.images[filename]['base64'] = `data:image/png;base64,${data.toString('base64')}`
        })
    for (let param of targetParams) {
      const [size, width, height] = param
      const targetFilename = `${filename.replace(/\.[a-zA-Z]+$/, '')}.${size}.jpg`
      const targetFilepath = path.join(targetPath, targetFilename)
      console.log(sourceFilepath, size, targetFilepath);
      mediaIndex.images[filename].resolutions[size] = {
        url: path.join(mediaUrl, targetFilename),
        params: { size, width, height }
      };
      await sharp(sourceFilepath)
        .resize({ width, height })
        .toFile(targetFilepath)
    }
  }

  fs.writeFile(mediaIndexPath, JSON.stringify(mediaIndex,null,2), (err, files) => {
    console.log(mediaIndexPath, 'written.')
    console.log(err)
  })
})
