import { PartialType } from '@nestjs/mapped-types';
import { CreateActionLogDto } from './create-action-log.dto';

export class UpdateActionLogDto extends PartialType(CreateActionLogDto) {}
