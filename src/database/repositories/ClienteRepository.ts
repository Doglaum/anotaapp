import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
  private repository: Repository<Cliente>;

  constructor() {
    this.repository = AppDataSource.getRepository(Cliente);
  }

  async create(cliente: Partial<Cliente>): Promise<Cliente> {
    const novoCliente = this.repository.create(cliente);
    return await this.repository.save(novoCliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Cliente | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, cliente: Partial<Cliente>): Promise<Cliente | null> {
    await this.repository.update(id, cliente);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 