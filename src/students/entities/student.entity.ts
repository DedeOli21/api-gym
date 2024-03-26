import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  weight: string;

  @Column()
  width: string;

  @Column()
  fileExercise?: number
}
