import { Instituicao } from 'src/instituicao/entities/instituicao.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Instituicao, (instituicao) => instituicao.colaboradores, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  instituicoes: Instituicao[];
}
