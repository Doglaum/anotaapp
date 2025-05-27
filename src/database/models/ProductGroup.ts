import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   OneToMany
} from 'typeorm'
import { Product } from './Product'

@Entity('product_group')
export class ProductGroup {
   @PrimaryGeneratedColumn()
   productGroupId: number

   @Column('text', { nullable: false })
   name: string

   @OneToMany(() => Product, product => product.productGroup, {
      cascade: true,
      eager: false
   })
   products: Product[]

   @CreateDateColumn()
   created_at: Date
}
