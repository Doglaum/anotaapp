import { ProductRepository } from '../database/repositories'
import { Product } from '../database/models/Product'
import { errorToast, successToast } from '@/components'

export class ProductService {
   private repository: ProductRepository

   constructor() {
      this.repository = new ProductRepository()
   }

   async save(product: Product): Promise<Product> {
      this.validate(product)
      try {
         product = await this.repository.create(product)
         successToast('Produto cadastrado com sucesso')
      } catch (error) {
         errorToast('Erro ao cadastrar produto')
      }
      return product
   }

   async listAll(): Promise<Product[]> {
      return await this.repository.findAll()
   }

   async findById(id: number): Promise<Product | null> {
      return await this.repository.findById(id)
   }

   async update(
      id: number,
      product: Partial<Product>
   ): Promise<Product | null | undefined> {
      this.validate(product)
      try {
         return await this.repository.update(id, product)
      } catch (error) {
         console.log(error)
      }
   }

   async delete(id: number): Promise<void> {
      await this.repository.delete(id)
   }

   async listAllWithIngredients(id: number): Promise<Product[]> {
      const result = await this.repository.findAllWithIngredients(id)
      if (!result) {
         errorToast('Ocorreu um problema ao tentar buscar os produtos')
         return []
      }
      return result
   }

   private validate(product: Partial<Product>) {
      if (!product.name) {
         errorToast('Nome é obrigatório')
         throw new Error('Nome é obrigatório')
      }
   }
}
