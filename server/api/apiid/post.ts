import db from './db.json'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newDB = db
  const index = db.map((item) => item.id).indexOf(body.id)

  if (index > -1) {
    newDB[index] = body
  } else {
    newDB.push(body)
  }

  try {
    fs.writeFileSync('./db.json', JSON.stringify(newDB))
    return 'success'
  } catch (error) {
    return error
  }
})
