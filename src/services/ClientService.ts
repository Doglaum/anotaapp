import { ClientRepository } from '../database/repositories';
import { Client } from '../database/models/Client';
import { errorToast, infoToast, successToast } from '@/components';

export class ClientService {
  private repository: ClientRepository;

  constructor() {
    this.repository = new ClientRepository();
  }

  async save(client: Client) : Promise<Client> {
    this.validate(client)
    const newClient = await this.repository.create(client);
    successToast('Cliente cadastrado com sucesso')
    return newClient
  }

  async listAll(): Promise<Client[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Client | null> {
    const cliente = await this.repository.findById(id);
    if(!cliente) {
      errorToast('Nenhum cliente encontrado')
      throw new Error('Nenhum cliente encontrado')
    }
    return cliente
  }

  async update(id: number, dados: Partial<Client>): Promise<Client | null> {
    this.validate(dados)
    return await this.repository.update(id, dados);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private validate(cliente: Partial<Client> | Client) {
    if (!cliente.name && !cliente.phoneNumber) {
      infoToast('É necessário informar nome ou telefone')
      throw new Error('É necessário informar nome ou telefone')
    }
  }
} 