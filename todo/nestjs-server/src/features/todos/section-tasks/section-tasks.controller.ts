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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionTaskDto: UpdateSectionTaskDto,
  ) {
    return this.sectionTasksService.update(+id, updateSectionTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionTasksService.remove(+id);
  }
}
