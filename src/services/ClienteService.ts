import { ClienteRepository } from '../database/repositories';
import { Cliente } from '../database/models/Cliente';
import { errorToast, infoToast, successToast } from '@/components';

export class ClienteService {
  private repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  async criarCliente(cliente: Cliente) : Promise<Cliente> {
    this.validate(cliente)
    const clienteCadastrado = await this.repository.create(cliente);
    successToast('Cliente cadastrado com sucesso')
    return clienteCadastrado
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.repository.findAll();
  }

  async buscarCliente(id: number): Promise<Cliente | null> {
    const cliente = await this.repository.findById(id);
    if(!cliente) {
      infoToast('Nenhum cliente encontrado')
      throw new Error('Nenhum cliente encontrado')
    }
    return cliente
  }

  async atualizarCliente(id: number, dados: Partial<Cliente>): Promise<Cliente | null> {
    this.validate(dados)
    return await this.repository.update(id, dados);
  }

  async excluirCliente(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private validate(cliente: Partial<Cliente> | Cliente) {
    if (!cliente.nome && !cliente.telefone) {
      errorToast('É necessário informar nome ou telefone')
      throw new Error('É necessário informar nome ou telefone')
    }
  }
} 