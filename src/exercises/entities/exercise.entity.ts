import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Nome Padrão' })
  name: string;

  @Column({ default: 'Nome Padrão' })
  HowToUse: string;

  @Column({ default: 'Nome Padrão' })
  level: string;

  @Column({ default: 'Nome Padrão' })
  muscle: string;

  @Column({ default: 'Nome Padrão' })
  weight: string;

  @Column({ default: 'Nome Padrão' })
  qtd: string;
  
}
