import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Product } from '../models/Product';

export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(product: Partial<Product>): Promise<Product> {
    console.log(product)
    const newProduct = this.repository.create(product);
    console.log(newProduct)
    return await this.repository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find({relations: ['ingredients']});
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOne({ where: { id }, relations: ['ingredients'] });
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    await this.repository.update(id, product);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllWithIngredients(): Promise<Product[]> {
    return await this.repository.createQueryBuilder("product").leftJoinAndSelect("product.ingredients", "ingredient").where("ingredient.id IS NOT NULL").getMany()
  }
} 