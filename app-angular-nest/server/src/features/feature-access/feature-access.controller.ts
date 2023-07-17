import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { FeatureAccessService } from './feature-access.service';
import { CreateFeatureAccessDto } from './dto/req/create-feature-access.dto';
import { UpdateFeatureAccessDto } from './dto/req/update-feature-access.dto';
import { DataRes } from 'src/shared/dto/res/data-res.dto';
import { FeatureAccess } from './entities/feature-access.entity';

@Controller('api/featureAccess')
export class FeatureAccessController {
  constructor(private readonly featureAccessService: FeatureAccessService) {}

  @Post()
  create(@Body() createFeatureAccessDto: CreateFeatureAccessDto) {
    return this.featureAccessService.create(createFeatureAccessDto);
  }

  @Get()
  async findAll(): Promise<DataRes<FeatureAccess[]>> {
    const featureAccess = await this.featureAccessService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: featureAccess,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureAccessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeatureAccessDto: UpdateFeatureAccessDto,
  ) {
    return this.featureAccessService.update(+id, updateFeatureAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureAccessService.remove(+id);
  }
}
