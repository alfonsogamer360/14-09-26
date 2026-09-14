import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})

pool.on('error', (err) => {
  console.error('Erro no banco:', err)
})