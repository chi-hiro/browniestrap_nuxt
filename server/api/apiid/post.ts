import db from './db.json'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newDB = db
  const index = db.map((item) => item.id).indexOf(body.id)

  try {
    if (index > -1) {
      newDB[index] = body
    } else {
      newDB.push(body)
    }
    fs.writeFileSync('/tmp/apiid/db.json', JSON.stringify(newDB))
  } catch (error) {
    return 'error'
  }

  return 'success'
})
