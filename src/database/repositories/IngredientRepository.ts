import { Ingredient } from './../models/Ingredient';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/orm-config';

export class IngredientRepository {
  private repository: Repository<Ingredient>;

  constructor() {
    this.repository = AppDataSource.getRepository(Ingredient);
  }

  async create(ingredient: Partial<Ingredient>): Promise<Ingredient> {
    const newIngredient = this.repository.create(ingredient);
    return await this.repository.save(newIngredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.repository.find();
  }

  async findById(ingredientId: number): Promise<Ingredient | null> {
    return await this.repository.findOne({ where: { ingredientId } });
  }

  async update(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient | null> {
    await this.repository.update(id, ingredient);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findByProductId(productId: number): Promise<Ingredient[]> {
    return await this.repository.query(
      'SELECT * FROM ingredients WHERE productId = ?',
      [productId]
    );
  }
} 