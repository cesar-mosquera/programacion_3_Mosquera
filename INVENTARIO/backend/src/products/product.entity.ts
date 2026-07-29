import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price?: number;

  @Column({ type: 'int', default: 0 })
  stock?: number;

  @Column({ type: 'varchar', length: 20 })
  type?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
