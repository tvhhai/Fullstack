import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureAccessService } from './feature-access.service';
import { CreateFeatureAccessDto } from './dto/create-feature-access.dto';
import { UpdateFeatureAccessDto } from './dto/update-feature-access.dto';

@Controller('api/featureAccess')
export class FeatureAccessController {
  constructor(private readonly featureAccessService: FeatureAccessService) {}

  @Post()
  create(@Body() createFeatureAccessDto: CreateFeatureAccessDto) {
    return this.featureAccessService.create(createFeatureAccessDto);
  }

  @Get()
  findAll() {
    return this.featureAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureAccessDto: UpdateFeatureAccessDto) {
    return this.featureAccessService.update(+id, updateFeatureAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureAccessService.remove(+id);
  }
}
