import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentStatus } from './PaymentStatus';

@Entity('payment_method')
export class PaymentMethod {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @ManyToOne(() => PaymentStatus, { eager: true })
  @JoinColumn({ name: 'paymentStatusId' })
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  created_at: Date;
} 