import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SectionTasksService } from './section-tasks.service';
import { CreateSectionTaskDto } from './dto/create-section-task.dto';
import { UpdateSectionTaskDto } from './dto/update-section-task.dto';

@Controller('api/section-tasks')
export class SectionTasksController {
  constructor(private readonly sectionTasksService: SectionTasksService) {}

  @Post()
  async create(@Body() data: CreateSectionTaskDto) {
    try {
      const projectTask = await this.sectionTasksService.create(data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: projectTask,
      };
    } catch (err) {}
  }

  @Post('arrange')
  async createAndUpdate(@Body() data: CreateSectionTaskDto) {
    try {
      const result = await this.sectionTasksService.createAndUpdate(data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: result,
      };
    } catch (err) {}
  }

  @Get()
  async findAll(@Query('project-task') projectTaskId: number) {
    try {
      const projectTasks = await this.sectionTasksService.findAll(
        projectTaskId,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: projectTasks,
      };
    } catch (err) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionTasksService.findOne(+id);
  }

  @Patch('title/:id')
  async update(
    @Param('id') id: number,
    @Body() updateSectionTaskDto: UpdateSectionTaskDto,
  ) {
    try {
      const data = await this.sectionTasksService.update(
        id,
        updateSectionTaskDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.sectionTasksService.remove(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (error) {}
  }
}
