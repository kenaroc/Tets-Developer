import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  asset_id: number;

  @Column()
  asset_name: string;

  @Column()
  stock_quantity: number;

  @Column()
  category: string;
}
