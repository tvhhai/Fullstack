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

  async createAndUpdate(data: CreateSectionTaskDto): Promise<Awaited<SectionTask>[]> {
    const projectTask = await this.create(data);

    if (Array.isArray(data.sectionTaskUpdateIndex)) {
      data.sectionTaskUpdateIndex.forEach((val) => {
        if (!val.id) {
          val.id = projectTask.id;
          val.index = projectTask.index;
        }
      });
    }

    return await this.updateMulti(data);
  }

  create(data: CreateSectionTaskDto): Promise<SectionTask> {
    return this.sectionTaskRepository.save(data.sectionTaskReq);
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
    const data = this.sectionTaskRepository.findOne({
      where: { id },
    });
    if (!data) {
      throw new Error('Section not found');
    }
    return data;
  }

  async update(
    id: number,
    updateSectionTaskDto: UpdateSectionTaskDto,
  ): Promise<SectionTask> {
    const data = await this.sectionTaskRepository.findOne({
      where: { id },
    });

    const updatedData = {
      ...data,
      ...updateSectionTaskDto.sectionTaskReq,
    };
    return this.sectionTaskRepository.save(updatedData);
  }

  updateMulti(data: UpdateSectionTaskDto) {
    const promises = data.sectionTaskUpdateIndex.map(async (item) => {
      const [entityToUpdate] = await Promise.all([
        this.sectionTaskRepository.findOne({
          where: { id: item.id },
        }),
      ]);
      if (entityToUpdate) {
        entityToUpdate.index = item.index;
        return this.sectionTaskRepository.save(entityToUpdate);
      }
    });

    return Promise.all(promises);
  }

  remove(id: number) {
    return this.sectionTaskRepository.delete(id);
  }
}
