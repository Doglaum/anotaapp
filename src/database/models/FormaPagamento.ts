import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('forma_pagamento')
export class FormaPagamento {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @CreateDateColumn()
  created_at: Date;
} 