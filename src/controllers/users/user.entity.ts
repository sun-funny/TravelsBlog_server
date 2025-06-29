import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  psw: string;

  @Column()
  email: string;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}