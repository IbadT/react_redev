import { PartialType } from '@nestjs/swagger';
import { CreateFavorityDto } from './create-favority.dto';

export class UpdateFavorityDto extends PartialType(CreateFavorityDto) {}
