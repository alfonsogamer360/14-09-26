import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

export const pool = new Pool()

pool.on('error', (err) => {
  console.error('Erro no banco:', err)
})