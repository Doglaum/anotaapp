import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description: string

  @CreateDateColumn()
  created_at: Date;
  
  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, { cascade: true })
  ingredients: Ingredient[];
}
