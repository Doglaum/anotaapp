import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './Client';
import { PaymentMethod } from './PaymentMethod';
import { OrderSituation } from './OrderSituation';
import { Address } from './Address';
import { OrderProduct } from './OrderProduct';

@Entity('order')
export class Order {

  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  @JoinColumn({ name: 'clienteId' })
  client: Client;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  deliveryFee: number;

  @ManyToOne(() => PaymentMethod, { eager: true })
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  changeFor: number;

  @ManyToOne(() => OrderSituation, { eager: true })
  @JoinColumn({ name: 'orderSituationId' })
  orderSituation: OrderSituation;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];

  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

} 