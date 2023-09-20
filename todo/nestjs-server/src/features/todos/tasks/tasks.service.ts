import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskIndexDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@features/todos/tasks/entities/task.entity';
import { SectionTasksService } from '@features/todos/section-tasks/section-tasks.service';
import { ProjectTasksService } from '@features/todos/project-tasks/project-tasks.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly sectionTasksService: SectionTasksService,
    private readonly projectTasksService: ProjectTasksService,
  ) {}

  create(data: CreateTaskDto) {
    return this.taskRepository.save(data);
  }

  findAll(projectTaskId?: number, sectionTaskId?: number) {
    return this.taskRepository.find({
      where: {
        projectTask: { id: projectTaskId },
        sectionTask: { id: sectionTaskId },
      },
    });
  }

  findByProjectTaskId(projectTaskId: number) {
    return this.taskRepository.find({
      where: {
        projectTask: { id: projectTaskId },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const data = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    const updatedData = {
      ...data,
      ...updateTaskDto,
    };

    return this.taskRepository.save(updatedData);
  }

  updateIndex(updateTaskDto: UpdateTaskIndexDto): Promise<Task[]> {
    const promises = updateTaskDto.tasks.map(async (item) => {
      const entityToUpdate = await this.taskRepository.findOne({
        where: { id: item.id },
        relations: ['projectTask', 'sectionTask'],
      });

      if (entityToUpdate) {
        entityToUpdate.index = item.index;

        if (updateTaskDto.projectTask) {
          entityToUpdate.projectTask = await this.projectTasksService.findOne(
            updateTaskDto.projectTask,
          );
          entityToUpdate.sectionTask = null;
        } else if (updateTaskDto.sectionTask) {
          entityToUpdate.sectionTask = await this.sectionTasksService.findOne(
            updateTaskDto.sectionTask,
          );
          entityToUpdate.projectTask = null;
        }

        return this.taskRepository.save(entityToUpdate);
      }
    });

    return Promise.all(promises);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
