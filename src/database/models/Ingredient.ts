import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   ManyToOne,
   JoinColumn,
   DeleteDateColumn
} from 'typeorm'
import { Product } from './Product'

@Entity('ingredient')
export class Ingredient {
   @PrimaryGeneratedColumn()
   ingredientId: number

   @Column('text')
   name: string

   @Column('decimal', { precision: 10, scale: 2, nullable: false, default: 0 })
   price: number

   @CreateDateColumn()
   created_at: Date

   @ManyToOne(() => Product, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'productId' })
   product: Product

   @DeleteDateColumn()
   deletedAt: Date
}
