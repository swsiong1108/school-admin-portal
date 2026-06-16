import { Router } from 'express'
import { query } from '../../db.ts'

const router = Router()

router.get('/', async (req, res) => {
  const levels = await query<{ id: number; name: string }[]>('SELECT id, name FROM levels')
  res.json({ data: levels })
})

export default router