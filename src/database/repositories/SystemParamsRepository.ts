import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/orm-config'
import { SystemParams } from '@/database/models'

export class SystemParamsRepository {
   private repository: Repository<SystemParams>

   constructor() {
      this.repository = AppDataSource.getRepository(SystemParams)
   }

   async create(systemParams: Partial<SystemParams>): Promise<SystemParams> {
      const newSystemParams = this.repository.create(systemParams)
      return await this.repository.save(systemParams)
   }

   async findAll(): Promise<SystemParams[]> {
      return await this.repository.find()
   }

   async findById(systemParamsId: number): Promise<SystemParams | null> {
      return await this.repository.findOne({ where: { systemParamsId } })
   }

   async update(
      id: number,
      systemParams: Partial<SystemParams>
   ): Promise<SystemParams | null> {
      await this.repository.update(id, systemParams)
      return await this.findById(id)
   }

   async delete(id: number): Promise<void> {
      await this.repository.delete(id)
   }
}
