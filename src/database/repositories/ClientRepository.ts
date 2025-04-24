import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Client } from '../models/Client';

export class ClientRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  async create(client: Partial<Client>): Promise<Client> {
    const newClient = this.repository.create(client);
    return await this.repository.save(newClient);
  }

  async findAll(): Promise<Client[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Client | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, client: Partial<Client>): Promise<Client | null> {
    await this.repository.update(id, client);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 