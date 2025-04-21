import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Produto } from './Produto';

@Entity('endereco')
export class Endereco {

   @PrimaryGeneratedColumn()
   id: number;

   @Column('text', { nullable: true })
   cidade: string;

   @Column('text', { nullable: true })
   bairro: string;

   @Column('text', { nullable: true })
   rua: string;

   @Column('text', { nullable: true })
   numero: string;

   @Column('text', { nullable: true })
   complemento: string;

   @ManyToOne(() => Cliente)
   @JoinColumn({ name: 'clienteId' })
   cliente: Cliente;

} 