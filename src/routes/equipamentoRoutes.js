import { Router } from 'express'
import equipamentoService from '../services/equipamentoService.js'

const equipamentoRouter = Router()

const enviarErroInterno = (res) => {
  return res.status(500).json({ erro: 'Erro interno do servidor' })
}

const validarDadosEquipamento = (dados) => {
  if (!dados || typeof dados !== 'object') {
    return 'Nome e categoria são obrigatórios'
  }

  const nomeValido = typeof dados.nome === 'string' && dados.nome.trim() !== ''
  const categoriaValida = typeof dados.categoria === 'string' && dados.categoria.trim() !== ''

  if (!nomeValido || !categoriaValida) {
    return 'Nome e categoria são obrigatórios'
  }

  return null
}

equipamentoRouter.get('/equipamentos', async (req, res) => {
  try {
    const equipamentos = await equipamentoService.listarTodos()
    return res.status(200).json(equipamentos)
  } catch (error) {
    return enviarErroInterno(res)
  }
})

equipamentoRouter.get('/equipamentos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.buscarPorId(id)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    return res.status(200).json(equipamento)
  } catch (error) {
    return enviarErroInterno(res)
  }
})

equipamentoRouter.post('/equipamentos', async (req, res) => {
  try {
    const erroValidacao = validarDadosEquipamento(req.body)

    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao })
    }

    const equipamentoCriado = await equipamentoService.criar(req.body)
    return res.status(201).json(equipamentoCriado)
  } catch (error) {
    if (error.message === 'Nome e categoria são obrigatórios') {
      return res.status(400).json({ erro: 'Nome e categoria são obrigatórios' })
    }

    return enviarErroInterno(res)
  }
})

equipamentoRouter.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
  try {
    const { id } = req.params
    const { disponivel } = req.body

    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({ erro: 'Campo disponivel deve ser booleano' })
    }

    const equipamento = await equipamentoService.atualizarDisponibilidade(id, disponivel)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    return res.status(200).json(equipamento)
  } catch (error) {
    return enviarErroInterno(res)
  }
})

equipamentoRouter.put('/equipamentos/:id/disponivel', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.atualizarDisponibilidade(id, true)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    return res.status(200).json(equipamento)
  } catch (error) {
    return enviarErroInterno(res)
  }
})

equipamentoRouter.put('/equipamentos/:id/indisponivel', async (req, res) => {
  try {
    const { id } = req.params
    const equipamento = await equipamentoService.atualizarDisponibilidade(id, false)

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' })
    }

    return res.status(200).json(equipamento)
  } catch (error) {
    return enviarErroInterno(res)
  }
})

export default equipamentoRouter
