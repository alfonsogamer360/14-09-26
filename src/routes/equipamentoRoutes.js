import { Router } from 'express'
import equipamentoService from '../services/equipamentoService.js'

const equipamentoRouter = Router()

/**
 * GET /equipamentos
 * Lista todos os equipamentos
 */
equipamentoRouter.get('/equipamentos', async (req, res) => {
  try {
    const equipamentos = await equipamentoService.listarTodos()
    res.json(equipamentos)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar equipamentos' })
  }
})

/**
 * GET /equipamentos/:id
 * Busca um equipamento específico por ID
 */
equipamentoRouter.get('/equipamentos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.buscarPorId(id)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    res.json(equipamento)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar equipamento' })
  }
})

/**
 * POST /equipamentos
 * Cria um novo equipamento com dados pré-definidos
 */
equipamentoRouter.post('/equipamentos', async (req, res) => {
  try {
    const novoEquipamento = await equipamentoService.criar({
      nome: "Servidor LG Intel Xeon",
      categoria: "Informática",
      condicao_uso: "Ruim",
      disponivel: false
    })

    res.status(201).json(novoEquipamento)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar equipamento' })
  }
})

/**
 * PATCH /equipamentos/:id/disponibilidade
 * Atualiza apenas a disponibilidade de um equipamento
 */
equipamentoRouter.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
  try {
    const { id } = req.params
    const { disponivel } = req.body

    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({ erro: 'Disponível deve ser um valor booleano' })
    }

    const equipamento = await equipamentoService.atualizarDisponibilidade(id, disponivel)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    res.json(equipamento)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar equipamento' })
  }
})

/**
 * PUT /equipamentos/:id/disponivel
 * Marca equipamento como disponível (sem precisar enviar body)
 */
equipamentoRouter.put('/equipamentos/:id/disponivel', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.atualizarDisponibilidade(id, true)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    res.json(equipamento)
  } catch (error) {
    console.error('Erro PUT disponivel:', error.message)
    res.status(500).json({ erro: error.message })
  }
})

/**
 * PUT /equipamentos/:id/indisponivel
 * Marca equipamento como indisponível (sem precisar enviar body)
 */
equipamentoRouter.put('/equipamentos/:id/indisponivel', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.atualizarDisponibilidade(id, false)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    res.json(equipamento)
  } catch (error) {
    console.error('Erro PUT indisponivel:', error.message)
    res.status(500).json({ erro: error.message })
  }
})

export default equipamentoRouter
