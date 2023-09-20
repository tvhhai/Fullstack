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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskIndexDto } from './dto/update-task.dto';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() data: CreateTaskDto) {
    try {
      const projectTask = await this.tasksService.create(data);

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
      const projectTasks = await this.tasksService.findByProjectTaskId(
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
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(id, updateTaskDto);
  // }

  @Patch('move')
  async updateIndex(@Body() updateTaskDto: UpdateTaskIndexDto) {
    try {
      const tasks = await this.tasksService.updateIndex(updateTaskDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: tasks,
      };
    } catch (err) {}
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: task,
      };
    } catch (err) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.tasksService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
    } catch (err) {}
  }
}
