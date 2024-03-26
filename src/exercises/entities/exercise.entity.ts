import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User'})
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  HowToUse: string;

  @Column()
  level: string;

  @Column()
  muscle: string;

  @Column()
  weight: string;

  @Column()
  qtd: string;
  
}
