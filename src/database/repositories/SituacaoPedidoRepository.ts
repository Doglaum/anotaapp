import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { SituacaoPedido } from '../models/SituacaoPedido';

export class SituacaoPedidoRepository {
  private repository: Repository<SituacaoPedido>;

  constructor() {
    this.repository = AppDataSource.getRepository(SituacaoPedido);
  }

  async create(situacaoPedido: Partial<SituacaoPedido>): Promise<SituacaoPedido> {
    const novaSituacaoPedido = this.repository.create(situacaoPedido);
    return await this.repository.save(novaSituacaoPedido);
  }

  async findAll(): Promise<SituacaoPedido[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<SituacaoPedido | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, situacaoPedido: Partial<SituacaoPedido>): Promise<SituacaoPedido | null> {
    await this.repository.update(id, situacaoPedido);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 