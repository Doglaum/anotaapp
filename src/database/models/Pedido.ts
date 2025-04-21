import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Cliente } from './Cliente';
import { FormaPagamento } from './FormaPagamento';
import { PedidoProduto } from './PedidoProduto';
import { SituacaoPedido } from './SituacaoPedido';
import { Endereco } from './Endereco';

@Entity('pedido')
export class Pedido {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { eager: true })
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @Column('decimal', { precision: 10, scale: 2 })
  valorTotal: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  taxaFrete: number;

  @ManyToOne(() => FormaPagamento, { eager: true })
  @JoinColumn({ name: 'formaPagamentoId' })
  formaPagamento: FormaPagamento;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  troco: number;

  @ManyToOne(() => SituacaoPedido, { eager: true })
  @JoinColumn({ name: 'situacaoPedidoId' })
  situacaoPedido: SituacaoPedido;

  @OneToMany(() => PedidoProduto, (pedidoProduto) => pedidoProduto.pedido, { cascade: true })
  pedidoProdutos: PedidoProduto[];

  @ManyToOne(() => Endereco, { nullable: true })
  @JoinColumn({ name: 'enderecoId' })
  endereco: Endereco;

  @CreateDateColumn()
  created_at: Date;

} 