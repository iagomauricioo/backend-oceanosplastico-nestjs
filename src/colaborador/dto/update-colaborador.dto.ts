import { PartialType } from '@nestjs/swagger';
import { CreateColaboradorDto } from './create-colaborador.dto';

export class UpdateColaboradorDto extends PartialType(CreateColaboradorDto) {
  nome?: string | undefined;
  cargo?: string | undefined;
  linkedin?: string | undefined;
  lattes?: string | undefined;
}
