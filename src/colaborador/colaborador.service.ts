import { Injectable } from '@nestjs/common';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { ILike, Repository } from 'typeorm';
import { Instituicao } from 'src/instituicao/entities/instituicao.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
  ) {}

  async createMany(
    createColaboradorDto: CreateColaboradorDto[],
  ): Promise<Colaborador[]> {
    const colaboradores = await Promise.all(
      createColaboradorDto.map(async (dto) => {
        const instituicoes = await this.instituicaoRepository.findByIds(
          dto.instituicoesIds,
        );

        return this.colaboradorRepository.create({
          ...dto,
          instituicoes,
        });
      }),
    );

    return this.colaboradorRepository.save(colaboradores);
  }

  findAll(): Promise<Colaborador[]> {
    return this.colaboradorRepository.find();
  }

  findOne(id: number): Promise<Colaborador | null> {
    return this.colaboradorRepository.findOneBy({ id });
  }

  findByInstituicao(nome: string): Promise<Colaborador[]> {
    return this.colaboradorRepository.find({
      relations: ['instituicoes'],
      where: {
        instituicoes: {
          nome: ILike(`%${nome}%`),
        },
      },
      order: { nome: 'ASC' },
    });
  }

  update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorRepository.update(id, updateColaboradorDto);
  }

  async remove(id: number): Promise<void> {
    await this.colaboradorRepository.delete(id);
  }
}
