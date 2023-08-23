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
import { ProjectTasksService } from './project-tasks.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { JwtGuards } from '@auth/guards/jwt.guard';
import { DataRes } from '@shared/dto/res/data-res.dto';
import { ProjectTask } from './entities/project-task.entity';

@Controller('api/project-tasks')
export class ProjectTasksController {
  constructor(private readonly projectTasksService: ProjectTasksService) {}

  @UseGuards(JwtGuards)
  @Post()
  async create(
    @Req() req: any,
    @Body() data: CreateProjectTaskDto,
  ): Promise<DataRes<ProjectTask>> {
    try {
      data.user = req.user;
      const projectTask = await this.projectTasksService.create(data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: projectTask,
      };
    } catch (err) {}
  }

  @UseGuards(JwtGuards)
  @Get()
  async findAll(@Req() req: any) {
    try {
      const projectTasks = await this.projectTasksService.findAll(req.user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: projectTasks,
      };
    } catch (err) {}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectTaskDto: UpdateProjectTaskDto,
  ) {
    return this.projectTasksService.update(+id, updateProjectTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTasksService.remove(+id);
  }
}
