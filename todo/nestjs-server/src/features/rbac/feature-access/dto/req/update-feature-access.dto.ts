import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureAccessDto } from './create-feature-access.dto';

export class UpdateFeatureAccessDto extends PartialType(CreateFeatureAccessDto) {}
