import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn
} from 'typeorm'
import { Client } from './Client'

@Entity('address')
export class Address {
   @PrimaryGeneratedColumn()
   addressId: number

   @Column('text', { nullable: true })
   city: string

   @Column('text', { nullable: true })
   neighborhood: string

   @Column('text', { nullable: true })
   street: string

   @Column('text', { nullable: true })
   number: string

   @Column('text', { nullable: true })
   complement: string

   @Column('text', { nullable: true })
   zipCode: string

   @ManyToOne(() => Client, client => client.addresses, {
      onDelete: 'SET NULL',
      nullable: true
   })
   @JoinColumn({ name: 'clientId' })
   client: Client
}
