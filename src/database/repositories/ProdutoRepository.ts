import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Produto } from '../models/Produto';

export class ProdutoRepository {
  private repository: Repository<Produto>;

  constructor() {
    this.repository = AppDataSource.getRepository(Produto);
  }

  async create(produto: Partial<Produto>): Promise<Produto> {
    const novoProduto = this.repository.create(produto);
    return await this.repository.save(novoProduto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Produto | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, produto: Partial<Produto>): Promise<Produto | null> {
    await this.repository.update(id, produto);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 