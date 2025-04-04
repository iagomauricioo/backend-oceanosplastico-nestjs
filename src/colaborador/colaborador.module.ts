import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { Instituicao } from 'src/instituicao/entities/instituicao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador, Instituicao])],
  providers: [ColaboradorService],
  controllers: [ColaboradorController],
  exports: [TypeOrmModule],
})
export class ColaboradorModule {}
