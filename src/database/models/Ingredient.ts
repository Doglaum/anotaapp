import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   ManyToOne,
   JoinColumn
} from 'typeorm'
import { Product } from './Product'

@Entity('ingredient')
export class Ingredient {
   @PrimaryGeneratedColumn()
   id: number

   @Column('text')
   name: string

   @Column('decimal', { precision: 10, scale: 2, nullable: true })
   price: number

   @CreateDateColumn()
   created_at: Date

   @ManyToOne(() => Product, {onDelete: 'CASCADE'})
   @JoinColumn({ name: 'productId' })
   product: Product
}
