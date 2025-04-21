import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { Pedido } from '../models/Pedido';
import { PedidoProduto } from '../models/PedidoProduto';

export class PedidoRepository {
  private repository: Repository<Pedido>;
  private pedidoProdutoRepository: Repository<PedidoProduto>;

  constructor() {
    this.repository = AppDataSource.getRepository(Pedido);
    this.pedidoProdutoRepository = AppDataSource.getRepository(PedidoProduto);
  }

  async create(pedido: Partial<Pedido>): Promise<Pedido> {
    const novoPedido = this.repository.create(pedido);
    return await this.repository.save(novoPedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.repository.find({
      relations: ['cliente', 'formaPagamento', 'situacaoPedido', 'pedidoProdutos.produto', 'endereco']
    });
  }

  async findById(id: number): Promise<Pedido | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['cliente', 'formaPagamento.nome', 'situacaoPedido.nome', 'pedidoProdutos.produto', 'endereco']
    });
  }

  async update(id: number, pedido: Partial<Pedido>): Promise<Pedido | null> {
    await this.repository.update(id, pedido);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addProduto(pedidoId: number, produtoId: number, detalhes?: string): Promise<void> {
    const pedidoProduto = this.pedidoProdutoRepository.create({
      pedidoId,
      produtoId,
      detalhes
    });
    await this.pedidoProdutoRepository.save(pedidoProduto);
  }

  async removeProduto(pedidoId: number, produtoId: number): Promise<void> {
    await this.pedidoProdutoRepository.delete({
      pedidoId,
      produtoId
    });
  }
} 