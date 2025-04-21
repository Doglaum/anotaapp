import { FormaPagamentoRepository } from '../database/repositories';
import { FormaPagamento } from '../database/models/FormaPagamento';

export class FormaPagamentoService {
  private repository: FormaPagamentoRepository;

  constructor() {
    this.repository = new FormaPagamentoRepository();
  }

  async gravar(formaPagamento: Partial<FormaPagamento>): Promise<FormaPagamento> {
    return await this.repository.create(formaPagamento);
  }

  async listar(): Promise<FormaPagamento[]> {
    return await this.repository.findAll();
  }

  async buscarFormaPagamento(id: number): Promise<FormaPagamento | null> {
    return await this.repository.findById(id);
  }
} 