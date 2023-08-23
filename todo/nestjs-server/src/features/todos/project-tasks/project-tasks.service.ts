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
    return this.projectTaskRepository.save(data);
  }

  findAll(user: User): Promise<ProjectTask[]> {
    return this.projectTaskRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} projectTask`;
  }

  update(id: number, updateProjectTaskDto: UpdateProjectTaskDto) {
    return `This action updates a #${id} projectTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectTask`;
  }
}
