import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('situacao_pedido')
export class SituacaoPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @CreateDateColumn()
  created_at: Date;
} 