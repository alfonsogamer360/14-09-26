import express from 'express'
import equipamentoRoutes from './routes/equipamentoRoutes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(equipamentoRoutes)

app.listen(port, () => {
  console.log(`API rodando em: http://localhost:${port}`)
})