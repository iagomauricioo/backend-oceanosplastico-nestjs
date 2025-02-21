import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cargo: string;

  @Column()
  foto: string;

  @Column()
  linkedin: string;

  @Column()
  lattes: string;

  @Column({ default: true })
  isActive: boolean;
}
