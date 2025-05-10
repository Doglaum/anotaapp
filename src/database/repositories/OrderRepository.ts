import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/orm-config'
import { Order } from '../models/Order'
import { OrderProduct } from '../models/OrderProduct'
import { error } from 'console'
import { errorToast, successToast } from '@/components'

export class OrderRepository {
   private repository: Repository<Order>
   private orderProductRepository: Repository<OrderProduct>

   constructor() {
      this.repository = AppDataSource.getRepository(Order)
      this.orderProductRepository = AppDataSource.getRepository(OrderProduct)
   }

   async create(order: Partial<Order>): Promise<Order> {
      try {
         let newOrder = this.repository.create(order)
         newOrder = await this.repository.save(newOrder)
         successToast('Pedido criado com sucesso, verifique a impressão!')
         return newOrder
      } catch (e) {
         console.log(e)
      }
      return {} as Order
   }

   async findAll(): Promise<Order[]> {
      return await this.repository.find({
         relations: ['client']
      })
   }

   async findById(orderId: number): Promise<Order | null> {
      return await this.repository.findOne({
         where: { orderId },
         relations: ['client']
      })
   }

   async update(id: number, order: Partial<Order>): Promise<Order | null> {
      await this.repository.update(id, order)
      return await this.findById(id)
   }

   async delete(id: number): Promise<void> {
      await this.repository.delete(id)
   }
}
