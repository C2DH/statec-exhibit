const fs = require('fs/promises')
const path = require('path')
const qrcode = require('qrcode')
// generate one for each theme then save the results as image files


const themesDir = './src/data/themes'
const qrcodesDir = './public'
const host = 'https://statec-streams.netlify.app'
const darkColor = '#2b219f' // var(--secondary)

fs.readdir(themesDir)
  .then(async (files) => {
    const filesContents = []
    for (let file of files) {
      const contents = await fs.readFile(path.join(themesDir, file))
      filesContents.push(JSON.parse(contents))
    }
    return filesContents
  })
  .then(async (themes) => {
    for (let theme of themes) {
      const themeUrl = String(new URL(theme.id, host))
      console.info(themeUrl)
      const xml = await qrcode.toString(themeUrl,{
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 50,
        color: {
          dark: darkColor,
          light: theme.backgroundColor
        }
      })
      // save xml to file
      const filepath = path.join(qrcodesDir, `qrcode-${theme.id}.svg`)
      await fs.writeFile(filepath, xml)
      console.log(theme.id, 'saved in', filepath)
    }
  })
