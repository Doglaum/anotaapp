import { ClienteRepository } from '../database/repositories';
import { Cliente } from '../database/models/Cliente';

export class ClienteService {
  private repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  async criarCliente(cliente: Cliente) : Promise<Cliente> {
    if (!cliente.nome) {
      throw new Error('Nome é obrigatório');
    }
    if(!cliente.endereco) {
      throw new Error('Endereço é obrigatório');
    }
    return await this.repository.create(cliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.repository.findAll();
  }

  async buscarCliente(id: number): Promise<Cliente | null> {
    return await this.repository.findById(id);
  }

  async atualizarCliente(id: number, dados: Partial<Cliente>): Promise<Cliente | null> {
    if (!dados.nome) {
      throw new Error('Nome é obrigatório');
    }
    if(!dados.endereco) {
      throw new Error('Endereço é obrigatório');
    }

    return await this.repository.update(id, dados);
  }

  async excluirCliente(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 