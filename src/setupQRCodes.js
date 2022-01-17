const fs = require('fs/promises')
const path = require('path')
const qrcode = require('qrcode')
// generate one for each theme then save the results as image files


const themesDir = './src/data/themes'
const qrcodesDir = './public'
const host = 'https://statec-streams.netlify.app'
const darkColor = '#2b219f' // var(--secondary)
const lightColor = '#ffc09d' // var(--primary)
const opts = {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  width: 20,
  small: true,
  color: {
    dark: darkColor,
    light: lightColor,
  }
}


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
      console.log('generating qrcode for:', theme.id)
      console.log(' - url:', themeUrl)
      const xml = await qrcode.toString(themeUrl, {
        ...opts,
        color: {
          dark: darkColor,
          light: theme.backgroundColor
        }
      })
      // save xml to file
      const filepath = path.join(qrcodesDir, `qrcode-${theme.id}.svg`)
      console.log(' - output', filepath)
      await fs.writeFile(filepath, xml)
    }
  }).then(async() => {
    // generate qrcode for the homepage
    console.log('generating qrcode for the homepage')
    console.log(' - url:', host)

    const xml = await qrcode.toString(host, opts)
    // save xml to file
    const filepath = path.join(qrcodesDir, 'qrcode-index.svg')
    console.log(' - output', filepath)
    await fs.writeFile(filepath, xml)
  })
