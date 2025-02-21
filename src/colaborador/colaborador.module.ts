import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador])],
  providers: [ColaboradorService],
  controllers: [ColaboradorController],
  exports: [TypeOrmModule],
})
export class ColaboradorModule {}
