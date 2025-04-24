import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   ManyToMany
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

   @ManyToMany(() => Product, product => product.ingredients)
   products: Product[]
}
