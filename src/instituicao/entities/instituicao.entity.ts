import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instituicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToMany(() => Colaborador, (colaborador) => colaborador.instituicoes)
  colaboradores: Colaborador[];
}
