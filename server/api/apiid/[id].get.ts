import db from './db.json'

type Type = {
  id: number
  title: string
  category: string
  remarks?: string
}

export default defineEventHandler(async (event) => {
  const res = db.find((item) => item.id === Number(event.context.params?.id))
  return res
})
