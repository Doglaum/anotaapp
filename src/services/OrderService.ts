import { OrderRepository } from '../database/repositories'
import { Order } from '../database/models/Order'
import { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { errorToast } from '@/components'

export class OrderService {
   private orderRepository: OrderRepository

   constructor() {
      this.orderRepository = new OrderRepository()
   }

   async createOrder(order: Partial<Order>): Promise<Order> {
      return await this.orderRepository.create(order)
   }

   async listAll(): Promise<Order[]> {
      return await this.orderRepository.findAll()
   }

   async findById(id: number): Promise<Order | null> {
      return await this.orderRepository.findById(id)
   }

   async deleteOrder(id: number): Promise<void> {
      await this.orderRepository.delete(id)
   }

   async listAllWithRangeDate(
      startDate: DateType,
      endDate: DateType
   ): Promise<Order[]> {
      if (!startDate) {
         startDate = dayjs()
            .hour(6)
            .minute(0)
            .second(0)
            .millisecond(0)
            .format('YYYY-MM-DD HH:mm:ss')
      } else {
         startDate = dayjs(startDate)
            .hour(6)
            .minute(0)
            .second(0)
            .millisecond(0)
            .format('YYYY-MM-DD HH:mm:ss')
         if (endDate) {
            endDate = dayjs(endDate)
               .add(1, 'day')
               .hour(5)
               .minute(59)
               .second(59)
               .millisecond(0)
               .format('YYYY-MM-DD HH:mm:ss')
         }
      }
      let result
      try {
         result = await this.orderRepository.findAllWithDateRange(
            startDate,
            endDate
         )
      } catch (error) {
         console.error(error)
         errorToast('Erro inesperado ao buscar pedidos')
         throw new Error('Erro inesperado ao buscar pedidos')
      }

      return result
   }
}
