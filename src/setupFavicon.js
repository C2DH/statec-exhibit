const Jimp = require('jimp');
const chalk = require('chalk');
const pngtoico = require("png-to-ico");

const log = console.log;
const hex = process.argv.slice(2).shift().trim()
console.log("color chosen", hex, chalk.supportsColor? '(preview)' : 'no preview available')
const h = hex.replace('#', '0x');
const size = 16
const color = 0xFDFD9BFF // parseInt(`0x${h}FF`)

for(let i = 0; i < size; i++){
  log(chalk.bgHex(hex).bold('  '.repeat(size)));
}
// generate monochromatic images of 16x16 pixels that can be used as favicon
// ased on
// https://stackoverflow.com/questions/12380841/generate-png-image-using-node-js
// accessed 11 Nov 2021
new Jimp(size, size, (err, image) => {
  if (err) throw err;

  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      image.setPixelColor(color, x, y);
    }
  }
  image.write('test.png', (err) => {
    if (err) throw err;
  });
  image.getBase64(Jimp.MIME_PNG, (err, pngData) => {
    if(err) {
      throw err
    }
    console.log("Resulting in pngData image data: \n", pngData, "\n");

    pngtoico([image]).then((data) => {
      const src = `data:image/x-icon;base64,${Buffer.from(data).toString('base64')}`
      console.log("Resulting in ICO image data: \n", src, "\n")
    })
  })
});
