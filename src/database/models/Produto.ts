import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Ingrediente } from './Ingrediente';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column('text', { nullable: true })
  descricao: string;

  @CreateDateColumn()
  created_at: Date;
  
  @ManyToMany(() => Ingrediente, (ingrediente) => ingrediente.produtos, { cascade: true })
  @JoinTable({
    name: 'produto_ingrediente', // Nome da tabela de associação
    joinColumn: { name: 'produtoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredienteId', referencedColumnName: 'id' },
  })
  ingredientes: Ingrediente[];
}
