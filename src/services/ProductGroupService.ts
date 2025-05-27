import { ProductGroupRepository } from '@/database/repositories'
import { ProductGroup } from '@/database/models/'
import { errorToast, successToast } from '@/components'

export class ProductGroupService {
   private repository: ProductGroupRepository

   constructor() {
      this.repository = new ProductGroupRepository()
   }

   async save(productGroup: Partial<ProductGroup>): Promise<ProductGroup> {
      if (!productGroup.name) {
         errorToast('Nome é obrigatório')
         throw Error('ProductGroup.name is required')
      }
      const newIngredient = await this.repository.create(productGroup)
      if (newIngredient) {
         successToast('Grupo cadastrado com sucesso')
      } else {
         throw new Error('Erro ao tentar cadastrar grupo')
         errorToast('Erro ao tentar cadastrar grupo')
      }
      return newIngredient
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
