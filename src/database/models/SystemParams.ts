import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('system_params')
export class SystemParams {
   @PrimaryGeneratedColumn()
   systemParamsId: number

   @Column('text')
   name: string

   @Column('integer')
   code: number

   @Column('text', { nullable: false })
   value: string
}
