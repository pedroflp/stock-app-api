import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export default class Product {

  @PrimaryColumn()
  name: string;

  @Column()
  quantity: number;
  
  @Column()
  price: number;
}