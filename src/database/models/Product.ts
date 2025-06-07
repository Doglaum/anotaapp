import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   OneToMany,
   DeleteDateColumn,
   ManyToOne,
   JoinColumn
} from 'typeorm'
import { Ingredient } from './Ingredient'
import { ProductGroup } from './ProductGroup'

@Entity('product')
export class Product {
   @PrimaryGeneratedColumn()
   productId: number

   @Column('text')
   name: string

   @Column('decimal', { precision: 10, scale: 2 })
   price: number

   @Column('text', { nullable: true })
   description: string

   @CreateDateColumn()
   created_at: Date

   @OneToMany(() => Ingredient, ingredient => ingredient.product, {
      cascade: true
   })
   ingredients: Ingredient[]

   @ManyToOne(() => ProductGroup, productGroup => productGroup.products, {
      onDelete: 'SET NULL',
      nullable: true,
      eager: true
   })
   @JoinColumn()
   productGroup: ProductGroup | null

   @DeleteDateColumn()
   deletedAt: Date
}
