import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Endereco } from './Endereco';
import { Pedido } from './Pedido';

@Entity('cliente')
export class Cliente {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @Column('text', { nullable: true })
  telefone: string;

  @OneToMany(() => Endereco, (endereco) => endereco.cliente, { cascade: true })
  enderecos: Endereco[];

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @CreateDateColumn()
  created_at: Date;
}