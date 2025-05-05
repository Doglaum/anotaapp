import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('payment_status')
export class PaymentStatus {
  
  @PrimaryGeneratedColumn()
  paymentStatusId: number;

  @Column('text')
  name: string;

  @CreateDateColumn()
  created_at: Date;
} 