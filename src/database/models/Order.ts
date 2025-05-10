import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   ManyToOne,
   OneToMany,
   JoinColumn,
   OneToOne
} from 'typeorm'
import { Client } from './Client'
import { PaymentMethod } from './PaymentMethod'
import { OrderSituation } from './OrderSituation'
import { Address } from './Address'
import { OrderProduct } from './OrderProduct'
import { PaymentStatus } from './PaymentStatus'

@Entity('order')
export class Order {
   @PrimaryGeneratedColumn()
   orderId: number

   @Column('text', { nullable: true })
   clientName: string

   @ManyToOne(() => Client, client => client.orders, {
      eager: true,
      cascade: false,
      nullable: true
   })
   @JoinColumn({ name: 'clienteId' })
   client: Client

   @Column('decimal', { precision: 10, scale: 2 })
   totalPrice: number

   @Column('decimal', { precision: 10, scale: 2, nullable: true })
   deliveryFee: number

   @ManyToOne(() => PaymentMethod, { eager: true, nullable: true })
   @JoinColumn({ name: 'paymentMethodId' })
   paymentMethod: PaymentMethod

   @Column('decimal', { precision: 10, scale: 2, nullable: true })
   changeFor: number

   @ManyToOne(() => OrderSituation, { eager: true, nullable: true })
   @JoinColumn({ name: 'orderSituationId' })
   orderSituation: OrderSituation

   @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, {
      cascade: true,
      eager: true
   })
   orderProducts: OrderProduct[]

   @ManyToOne(() => Address, { nullable: true, eager: true })
   @JoinColumn({ name: 'addressId' })
   address: Address

   @ManyToOne(() => PaymentStatus, { eager: true, nullable: true })
   @JoinColumn({ name: 'paymentStatusId' })
   paymentStatus: PaymentStatus

   @CreateDateColumn()
   created_at: Date
}
