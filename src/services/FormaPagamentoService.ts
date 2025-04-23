import { FormaPagamentoRepository } from '../database/repositories';
import { FormaPagamento } from '../database/models/FormaPagamento';
import { Item } from 'react-native-picker-select';
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

  async listarAsPickerItem(): Promise<Item[]> {
    const results = await this.repository.findAll();
    return results.map((item: any) => ({
      label: item.nome,
      value: item,
      key: item.id
    }));
  }

  async buscarFormaPagamento(id: number): Promise<FormaPagamento | null> {
    return await this.repository.findById(id);
  }
} 