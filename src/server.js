import express from 'express'
import equipamentoRoutes from './routes/equipamentoRoutes.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(equipamentoRoutes)

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err)
  res.status(500).json({ erro: 'Erro interno do servidor' })
})

export default app

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API rodando em: http://localhost:${port}`)
  })
}