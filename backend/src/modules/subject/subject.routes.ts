import { Router } from 'express'
import { query } from '../../db.ts'

const router = Router()

router.get('/', async (req, res) => {
  const subjects = await query<{ id: number; name: string }[]>('SELECT id, name FROM subjects')
  res.json({ data: subjects })
})

export default router