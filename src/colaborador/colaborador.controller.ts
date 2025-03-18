import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Iago Mauricio' },
        cargo: { type: 'string', example: 'Desenvolvedor Python e Angular' },
        linkedin: {
          type: 'string',
          example: 'https://www.linkedin.com/in/iagomauricioo/',
        },
        lattes: {
          type: 'string',
          example: 'http://lattes.cnpq.br/6076150135832214',
        },
      },
    },
  })
  create(@Body() createColaboradorDto: CreateColaboradorDto[]) {
    return this.colaboradorService.createMany(createColaboradorDto);
  }

  @Get()
  findAll() {
    return this.colaboradorService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colaboradorService.findOne(+id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Iago Mauricio' },
        cargo: { type: 'string', example: 'Desenvolvedor Python e Angular' },
        linkedin: {
          type: 'string',
          example: 'https://www.linkedin.com/in/iagomauricioo/',
        },
        lattes: {
          type: 'string',
          example: 'http://lattes.cnpq.br/6076150135832214',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateColaboradorDto: UpdateColaboradorDto,
  ) {
    return this.colaboradorService.update(+id, updateColaboradorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colaboradorService.remove(+id);
  }
}
