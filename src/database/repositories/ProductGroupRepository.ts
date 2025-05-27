import { ProductGroup } from '@/database/models'
import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/orm-config'

export class ProductGroupRepository {
   private repository: Repository<ProductGroup>

   constructor() {
      this.repository = AppDataSource.getRepository(ProductGroup)
   }

   async create(ProductGroup: Partial<ProductGroup>): Promise<ProductGroup> {
      const newIngredient = this.repository.create(ProductGroup)
      return await this.repository.save(newIngredient)
   }

   async findAll(): Promise<ProductGroup[]> {
      return await this.repository.find({
         relations: ['products']
      })
   }

   async findById(productGroupId: number): Promise<ProductGroup | null> {
      return await this.repository.findOne({
         where: { productGroupId },
         relations: ['products']
      })
   }

   async update(
      id: number,
      productGroup: Partial<ProductGroup>
   ): Promise<ProductGroup | null> {
      await this.repository.update(id, productGroup)
      return await this.findById(id)
   }

   async delete(id: number): Promise<void> {
      await this.repository.softDelete(id)
   }
}
