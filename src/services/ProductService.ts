import { ProductRepository } from '../database/repositories';
import { Product } from '../database/models/Product';
import { errorToast } from '@/components';

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async save(product: Product): Promise<Product> {
    this.validate(product)
    return await this.repository.create(product);
  }

  async listAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findById(id);
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    this.validate(product)
    return await this.repository.update(id, product);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async listAllWithIngredients(): Promise<Product[]> {
    return await this.repository.findAllWithIngredients();
  }

  private validate(product : Partial<Product>) {
    if (!product.name) {
      errorToast('Nome é obrigatório')
      throw new Error('Nome é obrigatório');
    }
  }
} 