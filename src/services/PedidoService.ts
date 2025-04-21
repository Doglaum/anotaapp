import { PedidoRepository, ClienteRepository, ProdutoRepository, FormaPagamentoRepository } from '../database/repositories';
import { Pedido } from '../database/models/Pedido';

export class PedidoService {
  private pedidoRepository: PedidoRepository;
  private clienteRepository: ClienteRepository;
  private produtoRepository: ProdutoRepository;
  private formaPagamentoRepository: FormaPagamentoRepository;

  constructor() {
    this.pedidoRepository = new PedidoRepository();
    this.clienteRepository = new ClienteRepository();
    this.produtoRepository = new ProdutoRepository();
    this.formaPagamentoRepository = new FormaPagamentoRepository();
  }

  async criarPedido(pedido: Partial<Pedido>): Promise<Pedido> {    
    return await this.pedidoRepository.create(pedido)
  }

  async listarPedidos(): Promise<Pedido[]> {
    return await this.pedidoRepository.findAll();
  }

  async buscarPedido(id: number): Promise<Pedido | null> {
    return await this.pedidoRepository.findById(id);
  }

  async excluirPedido(id: number): Promise<void> {
    await this.pedidoRepository.delete(id);
  }
} 