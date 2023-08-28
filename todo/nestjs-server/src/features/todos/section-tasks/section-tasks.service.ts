import { Injectable } from '@nestjs/common';
import { CreateSectionTaskDto } from './dto/create-section-task.dto';
import { UpdateSectionTaskDto } from './dto/update-section-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionTask } from '@features/todos/section-tasks/entities/section-task.entity';

@Injectable()
export class SectionTasksService {
  constructor(
    @InjectRepository(SectionTask)
    private readonly sectionTaskRepository: Repository<SectionTask>,
  ) {}

  create(data: CreateSectionTaskDto): Promise<SectionTask> {
    return this.sectionTaskRepository.save(data);
  }

  findAll(projectTaskId: number) {
    return this.sectionTaskRepository.find({
      where: {
        projectTask: { id: projectTaskId },
      },
      relations: ['tasks'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionTask`;
  }

  update(id: number, updateSectionTaskDto: UpdateSectionTaskDto) {
    return `This action updates a #${id} sectionTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionTask`;
  }
}
