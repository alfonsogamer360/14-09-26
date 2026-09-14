import { pool } from '../database/db.js'

export class EquipamentoService {

  async listarTodos() {
    try {
      const result = await pool.query(
        'SELECT id, nome, categoria, condicao_uso, disponivel FROM equipamentos ORDER BY nome'
      )
      return result.rows
    } catch (error) {
      console.error('Erro ao listar equipamentos:', error)
      throw error
    }
  }

  async buscarPorId(id) {
    try {
      const result = await pool.query(
        'SELECT id, nome, categoria, condicao_uso, disponivel FROM equipamentos WHERE id = $1',
        [id]
      )
      // Retorna o objeto do equipamento ou null se não encontrado
      return result.rows.length > 0 ? result.rows[0] : null
    } catch (error) {
      console.error(`Erro ao buscar equipamento com id ${id}:`, error)
      throw error
    }
  }

  async criar(equipamento) {
    const { nome, categoria, condicao_uso = 'Bom estado', disponivel = false } = equipamento

    if (!nome || !categoria) {
      throw new Error('Nome e categoria são obrigatórios')
    }

    try {
      const result = await pool.query(
        'INSERT INTO equipamentos (nome, categoria, condicao_uso, disponivel) VALUES ($1, $2, $3, $4) RETURNING id, nome, categoria, condicao_uso, disponivel',
        [nome, categoria, condicao_uso, disponivel]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Erro ao criar equipamento:', error)
      throw error
    }
  }


  async atualizarDisponibilidade(id, disponivel) {
    try {
      const result = await pool.query(
        'UPDATE equipamentos SET disponivel = $1 WHERE id = $2 RETURNING id, nome, categoria, condicao_uso, disponivel',
        [disponivel, id]
      )
      return result.rows.length > 0 ? result.rows[0] : null
    } catch (error) {
      console.error(`Erro ao atualizar disponibilidade do equipamento ${id}:`, error)
      throw error
    }
  }
}

export default new EquipamentoService()
