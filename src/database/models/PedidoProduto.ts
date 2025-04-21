import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './Pedido';
import { Produto } from './Produto';

@Entity('pedido_produto')
export class PedidoProduto {

  @PrimaryColumn('integer')
  pedidoId: number;

  @PrimaryColumn('integer')
  produtoId: number;

  @Column('text', { nullable: true })
  detalhes: string;

  @Column('integer', { default: 1 })
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorUnitario: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.pedidoProdutos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  @ManyToOne(() => Produto, { eager: true })
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;
}