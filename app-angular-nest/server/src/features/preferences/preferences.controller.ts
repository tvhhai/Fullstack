import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { JwtGuards } from '../../auth/guards/jwt.guard';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @UseGuards(JwtGuards)
  @Post('create-default')
  async create(@Req() req: any, @Body() createPreferenceDto: CreatePreferenceDto) {
    try {
      await this.preferencesService.createDataDefault(
        createPreferenceDto,
        req.user,
      );
      const data = await this.preferencesService.findAll(req.user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (e) {}
  }

  @UseGuards(JwtGuards)
  @Get()
  async findAll(@Req() req: any) {
    try {
      const data = await this.preferencesService.findAll(req.user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (e) {}
  }

  @UseGuards(JwtGuards)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.preferencesService.findOne(+id);
  }

  @UseGuards(JwtGuards)
  @Patch(':settingKey')
  update(
    @Req() req: any,
    @Param('settingKey') settingKey: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferencesService.update(
      settingKey,
      req.user,
      updatePreferenceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(+id);
  }
}
