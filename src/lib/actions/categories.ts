import { db } from '../db'

export async function getCategories() {
  return db.category.findMany()
}
