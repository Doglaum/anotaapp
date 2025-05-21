import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('system_params')
export class SystemParams {
   @PrimaryGeneratedColumn()
   systemParamsId: number

   @Column('text')
   name: string

   @Column('text')
   code: string

   @Column('text', { nullable: false })
   value: string
}
