import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('order_situation')
export class OrderSituation {
  @PrimaryGeneratedColumn()
  orderSituationId: number;

  @Column('text')
  name: string;

  @CreateDateColumn()
  created_at: Date;
} 