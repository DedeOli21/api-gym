import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number;

  @Column()
  active: boolean;

  @Column()
  validAt: Date;

  @Column()
  type: string;

  @Column()
  exercises: string;
}
