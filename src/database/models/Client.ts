import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   OneToMany
} from 'typeorm'
import { Address } from './Address'
import { Order } from './Order'

@Entity('client')
export class Client {
   @PrimaryGeneratedColumn()
   clientId: number

   @Column('text')
   name: string

   @Column('text', { nullable: true })
   phoneNumber: string

   @OneToMany(() => Address, address => address.client, {
      cascade: false,
      nullable: true
   })
   addresses: Address[]

   @OneToMany(() => Order, order => order.client)
   orders: Order[]

   @CreateDateColumn()
   created_at: Date
}
