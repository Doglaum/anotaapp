import { SituacaoPedido } from "../database/models/SituacaoPedido";
import { SituacaoPedidoRepository } from "../database/repositories/SituacaoPedidoRepository";
import { Item } from "react-native-picker-select";

export class SituacaoPedidoService {
  private repository: SituacaoPedidoRepository;

  constructor() {
    this.repository = new SituacaoPedidoRepository();
  }

  async gravar(situacaoPedido: Partial<SituacaoPedido>): Promise<SituacaoPedido> {
    return await this.repository.create(situacaoPedido);
  }

  async listar(): Promise<SituacaoPedido[]> {
    const a =  await this.repository.findAll()
    console.log(a)
    return await this.repository.findAll();
  }

  async buscarSituacaoPedido(id: number): Promise<SituacaoPedido | null> {
    return await this.repository.findById(id);
  }

  async listarAsPickerItem(): Promise<Item[]> {
    const results = await this.repository.findAll();
    return results.map((item: any) => ({
      label: item.nome,
      value: item,
      key: item.id
    }));
  }
} 