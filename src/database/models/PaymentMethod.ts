import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn
} from 'typeorm'

@Entity('payment_method')
export class PaymentMethod {
   @PrimaryGeneratedColumn()
   paymentMethodId: number

   @Column('text')
   name: string

   @CreateDateColumn()
   created_at: Date
}
