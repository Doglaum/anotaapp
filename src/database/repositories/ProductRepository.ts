import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';
import { Product } from '../models/Product';
import { Ingredient } from '../models';
import { successToast } from '@/components';
export class ProductRepository {
  private repository: Repository<Product>;
  private ingredientRepository: Repository<Ingredient>

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
    this.ingredientRepository = AppDataSource.getRepository(Ingredient);
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

  async update(id: number, updateData: Partial<Product>): Promise<Product | null> {
    await this.repository.save(updateData);
    successToast('Produto alterado com sucesso!')
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAllWithIngredients(): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.ingredients", "ingredient")
      .where("ingredient.id IS NOT NULL")
      .getMany()
  }
} 