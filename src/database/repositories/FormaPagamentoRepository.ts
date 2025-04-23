import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { FormaPagamento } from '../models/FormaPagamento';

export class FormaPagamentoRepository {
  private repository: Repository<FormaPagamento>;

  constructor() {
    this.repository = AppDataSource.getRepository(FormaPagamento);
  }

  async create(formaPagamento: Partial<FormaPagamento>): Promise<FormaPagamento> {
    const novaFormaPagamento = this.repository.create(formaPagamento);
    return await this.repository.save(novaFormaPagamento);
  }

  async findAll(): Promise<FormaPagamento[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<FormaPagamento | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, formaPagamento: Partial<FormaPagamento>): Promise<FormaPagamento | null> {
    await this.repository.update(id, formaPagamento);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 