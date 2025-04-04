import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cargo: string;

  @Column()
  linkedin: string;

  @Column()
  lattes: string;

  @Column({ default: true })
  isActived: boolean;

  @Column({ default: 'LERE' })
  instituicao: string;
}
