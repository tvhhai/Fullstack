import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TableSettingsService } from './table-settings.service';
import { CreateTableSettingDto } from './dto/create-table-setting.dto';
import { UpdateTableSettingDto } from './dto/update-table-setting.dto';
import { JwtGuards } from '../../auth/guards/jwt.guard';
import { DataRes } from '../../shared/dto/res/data-res.dto';
import { TableSetting } from './entities/table-setting.entity';

@Controller('api/table-settings')
export class TableSettingsController {
  constructor(private readonly tableSettingsService: TableSettingsService) {}

  @UseGuards(JwtGuards)
  @Post()
  async create(
    @Req() req: any,
    @Body() data: CreateTableSettingDto,
  ): Promise<DataRes<TableSetting>> {
    try {
      data.user = req.user;
      const tableSetting = await this.tableSettingsService.create(data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: tableSetting,
      };
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Get(':tableId')
  async findByTableId(@Req() req: any, @Param('tableId') tableId: string) {
    try {
      const tableSetting = await this.tableSettingsService.findByTableId(
        req.user,
        tableId,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: tableSetting,
      };
    } catch (err) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableSettingsService.findOne(+id);
  }

  @UseGuards(JwtGuards)
  @Patch(':tableId')
  update(
    @Req() req: any,
    @Param('tableId') tableId: string,
    @Body() updateTableSettingDto: UpdateTableSettingDto,
  ) {
    return this.tableSettingsService.update(
      tableId,
      req.user,
      updateTableSettingDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableSettingsService.remove(+id);
  }
}
