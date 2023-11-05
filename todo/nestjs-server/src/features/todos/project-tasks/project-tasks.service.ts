import { Injectable } from '@nestjs/common';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTask } from './entities/project-task.entity';
import { User } from '@features/rbac/users/entities/user.entity';

@Injectable()
export class ProjectTasksService {
  constructor(
    @InjectRepository(ProjectTask)
    private readonly projectTaskRepository: Repository<ProjectTask>,
  ) {}

  create(data: CreateProjectTaskDto): Promise<ProjectTask> {
    data.titleSlug = this.changeToSlug(data.title);
    data.isShowCompleteTask = false;
    return this.projectTaskRepository.save(data);
  }

  changeToSlug(data: string) {
    return data.replace(/\s/g, '-').toLowerCase();
  }

  findAll(user: User): Promise<ProjectTask[]> {
    return this.projectTaskRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['sectionTasks', 'tasks', 'sectionTasks.tasks'],
    });
  }

  findOne(id: number) {
    const data = this.projectTaskRepository.findOne({
      where: { id },
      relations: ['sectionTasks', 'tasks', 'sectionTasks.tasks'],
      order: {
        sectionTasks: {
          index: 'ASC',
          tasks: {
            index: 'ASC',
          },
        },
        tasks: {
          index: 'ASC',
        },
      },
    });
    if (!data) {
      throw new Error('Project not found');
    }
    return data;
  }



  async update(id: number, updateProjectTaskDto: UpdateProjectTaskDto) {
    const data = await this.projectTaskRepository.findOne({
      where: {
        id: id,
      },
    });

    const updatedData = {
      ...data,
      ...updateProjectTaskDto,
    };

    return this.projectTaskRepository.save(updatedData);
  }

  remove(id: number) {
    return this.projectTaskRepository.delete(id);
  }
}
