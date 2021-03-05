import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

import Product from './Product';

@Entity('users')
export default class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassowrd() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToMany(() => Product, product => product.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  products: Product[];
}