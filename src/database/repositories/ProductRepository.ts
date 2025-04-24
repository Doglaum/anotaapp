import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Product } from '../models/Product';

export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.repository.create(product);
    return await this.repository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    await this.repository.update(id, product);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 