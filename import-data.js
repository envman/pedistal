const fs = require('fs-extra')
const path = require('path')
const util = require('util')

xlsxj = util.promisify(require("xlsx-to-json"))

const [filename, photos] = process.argv.slice(2)

const check_image = async (item, key) => {
  if (item[key]) {
    const exists = await fs.exists(path.join(__dirname, photos, `${item[key]}.jpg`))

    if (!exists) {
      throw new Error(`${item.Name} image "${item[key]}.jpg" does not exist`)
    }
  }
}

;(async () => {
  await xlsxj({ input: filename, output: 'data.json' })

  const json = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8')

  const data = JSON.parse(json)
  for (let item of data) {
    await check_image(item, 'Image1')
    await check_image(item, 'Image2')
    await check_image(item, 'Image 3')
    await check_image(item, 'Image 4')
    await check_image(item, 'Image 5')
  }

  const updated = `
    bobbys = ${json}
  `

  await fs.writeFile(path.join(__dirname, 'site', 'data.js'), updated)

  await fs.emptyDir(path.join(__dirname, 'site', 'photos'))
  await fs.copy(path.join(__dirname, photos), path.join(__dirname, 'site', 'photos'))
})()

