import { ProdutoRepository } from '../database/repositories';
import { Produto } from '../database/models/Produto';

export class ProdutoService {
  private repository: ProdutoRepository;

  constructor() {
    this.repository = new ProdutoRepository();
  }

  async criarProduto(produto: Produto): Promise<Produto> {
    if (!produto.nome) {
      throw new Error('Nome é obrigatório');
    }

    if (produto.preco <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    return await this.repository.create(produto);
  }

  async listarProdutos(): Promise<Produto[]> {
    return await this.repository.findAll();
  }

  async buscarProduto(id: number): Promise<Produto | null> {
    return await this.repository.findById(id);
  }

  async atualizarProduto(id: number, dados: Partial<Produto>): Promise<Produto | null> {
    if (dados.nome && !dados.nome.trim()) {
      throw new Error('Nome é obrigatório');
    }

    if (dados.preco && dados.preco <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    return await this.repository.update(id, dados);
  }

  async excluirProduto(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 