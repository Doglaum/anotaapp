import { Repository } from 'typeorm'
import { AppDataSource } from '../../config/orm-config'
import { Order } from '../models/Order'
import { OrderProduct } from '../models/OrderProduct'
import { errorToast, successToast } from '@/components'
import { DateType } from 'react-native-ui-datepicker'

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
         errorToast('Ocorreu um problema ao criar o pedido!')
         console.error(e)
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
      try {
         await this.repository.update(id, order)
      } catch (error) {
         console.error(error)
      }
      return await this.findById(id)
   }

   async delete(id: number): Promise<void> {
      await this.repository.delete(id)
   }

   async findAllWithDateRange(
      startDate: DateType,
      endDate: DateType
   ): Promise<Order[]> {
      const query = this.repository
         .createQueryBuilder('o')
         .leftJoinAndSelect('o.client', 'client')
         .leftJoinAndSelect('o.orderProducts', 'orderProducts')
         .leftJoinAndSelect('orderProducts.product', 'product')
         .leftJoinAndSelect(
            'orderProducts.selectedIngredients',
            'selectedIngredients'
         )
         .leftJoinAndSelect('o.address', 'address')
         .leftJoinAndSelect('o.orderSituation', 'orderSituation')
         .leftJoinAndSelect('o.paymentMethod', 'paymentMethod')
         .leftJoinAndSelect('o.paymentStatus', 'paymentStatus')
         .orderBy('o.orderId', 'DESC')
         .where('o.created_at >= :startDate', { startDate })
      if (endDate) {
         query.andWhere('o.created_at <= :endDate', { endDate })
      }
      return query.getMany()
   }
}
