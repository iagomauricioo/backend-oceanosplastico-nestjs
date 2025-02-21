/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
  ) {}

  async create(
    createColaboradorDto: CreateColaboradorDto,
  ): Promise<Colaborador> {
    const colaborador = this.colaboradorRepository.create(createColaboradorDto);
    return this.colaboradorRepository.save(colaborador);
  }

  findAll(): Promise<Colaborador[]> {
    return this.colaboradorRepository.find();
  }

  findOne(id: number): Promise<Colaborador | null> {
    return this.colaboradorRepository.findOneBy({ id });
  }

  update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorRepository.update(id, updateColaboradorDto);
  }

  async remove(id: number): Promise<void> {
    await this.colaboradorRepository.delete(id);
  }
}
