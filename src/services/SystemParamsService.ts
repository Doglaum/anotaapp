import { SystemParamsRepository } from '../database/repositories'
import { SystemParams } from '@/database/models/SystemParams'

export class SystemParamsService {
   private repository: SystemParamsRepository

   constructor() {
      this.repository = new SystemParamsRepository()
   }

   async save(printer: Partial<SystemParams>): Promise<SystemParams> {
      return await this.repository.create(printer)
   }

   async listAll(): Promise<SystemParams[]> {
      return await this.repository.findAll()
   }

   async findById(id: number): Promise<SystemParams> {
      const systemParams = await this.repository.findById(id)
      if (!systemParams) {
         return {} as SystemParams
      }
      return systemParams
   }
}
