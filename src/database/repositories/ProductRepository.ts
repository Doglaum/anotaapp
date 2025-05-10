import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/orm-config'
import { Product } from '../models/Product'
import { errorToast, successToast } from '@/components'
export class ProductRepository {
   private repository: Repository<Product>

   constructor() {
      this.repository = AppDataSource.getRepository(Product)
   }

   async create(product: Partial<Product>): Promise<Product> {
      console.log(product)
      const newProduct = this.repository.create(product)
      console.log(newProduct)
      return await this.repository.save(newProduct)
   }

   async findAll(): Promise<Product[]> {
      return await this.repository.find({ relations: ['ingredients'] })
   }

   async findById(productId: number): Promise<Product | null> {
      return await this.repository.findOne({
         where: { productId },
         relations: ['ingredients']
      })
   }

   async update(
      id: number,
      updateData: Partial<Product>
   ): Promise<Product | null> {
      await this.repository.save(updateData)
      successToast('Produto alterado com sucesso!')
      return await this.findById(id)
   }

   async delete(id: number): Promise<void> {
      try {
         await this.repository.softDelete(id)
      } catch (e) {
         errorToast('Ocorreu um erro ao tentar excluir produto')
         console.log(e)
      }
   }

   async findAllWithIngredients(id: number): Promise<Product[] | undefined> {
      try {
         return await this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.ingredients', 'ingredient')
            .where('ingredient.ingredientId IS NOT NULL')
            .andWhere('product.productId != :currentProductId', {
               currentProductId: id
            })
            .getMany()
      } catch (e) {
         console.log(e)
      }
   }
}
