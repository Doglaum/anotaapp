import { ProductGroupRepository } from '@/database/repositories'
import { ProductGroup } from '@/database/models/'
import { errorToast, successToast } from '@/components'
import { ProductService } from './ProductService'

export class ProductGroupService {
   private repository: ProductGroupRepository
   private productService: ProductService

   constructor() {
      this.repository = new ProductGroupRepository()
      this.productService = new ProductService()
   }

   async save(
      productGroup: Partial<ProductGroup>
   ): Promise<ProductGroup | null> {
      let newProductGroup:
         | ProductGroup
         | PromiseLike<ProductGroup | null>
         | null = null
      if (!productGroup.name) {
         errorToast('Nome é obrigatório')
         throw Error('ProductGroup.name is required')
      }
      try {
         const { products, ...groupData } = productGroup
         if (groupData.productGroupId) {
            newProductGroup = await this.repository.update(
               groupData.productGroupId,
               groupData
            )
         } else {
            newProductGroup = await this.repository.create(groupData)
         }
         if (products && newProductGroup) {
            this.productService.updateProductGroup(newProductGroup, products)
         }
      } catch (error) {
         console.error(error)
      }
      if (newProductGroup) {
         successToast('Grupo cadastrado com sucesso')
      } else {
         errorToast('Erro ao tentar cadastrar grupo')
         throw new Error('Erro ao tentar cadastrar grupo')
      }
      return newProductGroup
   }

   async delete(id: number) {
      await this.repository.delete(id)
      return await this.listAll()
   }

   async listAll(): Promise<ProductGroup[]> {
      return await this.repository.findAll()
   }

   async findById(id: number): Promise<ProductGroup | null> {
      return await this.repository.findById(id)
   }
}
