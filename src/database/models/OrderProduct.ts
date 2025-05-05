import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { Ingredient } from './Ingredient';

@Entity('order_product')
export class OrderProduct {

  @PrimaryColumn('integer')
  orderProductId: number;

  @PrimaryColumn('integer')
  productId: number;

  @Column('text', { nullable: true })
  details: string;

  @Column('integer', { default: 1 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @ManyToMany(() => Ingredient, { eager: true })
  @JoinTable({
    name: 'order_product_ingredients',
    joinColumn: {name: 'orderProductId', referencedColumnName: 'orderProductId'},
    inverseJoinColumn: {name: 'ingredientId', referencedColumnName: 'ingredientId'}
  })
  selectedIngredients: Ingredient[];
  

  @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;  

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;
}