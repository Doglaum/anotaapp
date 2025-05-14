import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   ManyToMany,
   JoinTable
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'
import { Ingredient } from './Ingredient'

@Entity('order_product')
export class OrderProduct {
   @PrimaryGeneratedColumn('increment') // Gera automaticamente um ID único
   orderProductId: number

   @Column('integer')
   productId: number

   @Column('text', { nullable: true })
   details: string

   @Column('integer', { default: 1 })
   quantity: number

   @Column('decimal', { precision: 10, scale: 2 })
   unitPrice: number

   @Column('decimal', { precision: 10, scale: 2 })
   totalPrice: number

   @ManyToMany(() => Ingredient, { eager: true }) // Relação Many-to-Many com Ingredient
   @JoinTable({
      name: 'order_product_ingredients', // Nome da tabela intermediária
      joinColumn: {
         name: 'orderProductId', // Coluna que referencia OrderProduct
         referencedColumnName: 'orderProductId'
      },
      inverseJoinColumn: {
         name: 'ingredientId', // Coluna que referencia Ingredient
         referencedColumnName: 'ingredientId'
      }
   })
   selectedIngredients: Ingredient[]

   @ManyToOne(() => Order, order => order.orderProducts, {
      onDelete: 'CASCADE'
   })
   @JoinColumn({ name: 'orderId' })
   order: Order

   @ManyToOne(() => Product, { eager: true })
   @JoinColumn({ name: 'productId' })
   product: Product
}
