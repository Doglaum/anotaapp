import { IngredientRepository } from '../database/repositories';
import { Ingredient } from '../database/models/';
import { errorToast, successToast } from '@/components';

export class IngredientService {
  private repository: IngredientRepository;

  constructor() {
    this.repository = new IngredientRepository();
  }

  async save(ingredient: Partial<Ingredient>): Promise<Ingredient> {
    if(!ingredient.name) {
      errorToast('Nome é obrigatório')
      throw Error('ingredient.name is required')
    }
    const newIngredient = await this.repository.create(ingredient);
    if(newIngredient) {
      successToast('Ingrediente Cadastrado')
    } else {
      errorToast('Houve algum problema')
    }
    return newIngredient
  }

  async delete(id: number) {
    await this.repository.delete(id)
    return await this.listAll()
  }

  async listAll(): Promise<Ingredient[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Ingredient | null> {
    return await this.repository.findById(id);
  }

  async findByProductId(productId: number): Promise<Ingredient[] | null> {
    return await this.repository.findByProductId(productId);
  }
} 