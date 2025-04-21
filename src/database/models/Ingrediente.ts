import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   ManyToMany
} from 'typeorm'
import { Produto } from './Produto'

@Entity('ingrediente')
export class Ingrediente {
   @PrimaryGeneratedColumn()
   id: number

   @Column('text')
   nome: string

   @Column('text', { nullable: true })
   unidade: string // Exemplo: "kg", "g", "ml", etc.

   @CreateDateColumn()
   created_at: Date

   @ManyToMany(() => Produto, produto => produto.ingredientes)
   produtos: Produto[]
}
