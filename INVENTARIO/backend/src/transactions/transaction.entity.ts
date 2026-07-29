import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  productId?: string;

  @Column({ type: 'varchar', length: 255 })
  productName?: string;

  @Column({ type: 'varchar', length: 50 })
  action?: string;

  @Column({ type: 'text' })
  detail?: string;

  @CreateDateColumn()
  date?: Date;
}
