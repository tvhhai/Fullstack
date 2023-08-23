import { Module } from '@nestjs/common';
import { ProjectTasksService } from './project-tasks.service';
import { ProjectTasksController } from './project-tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTask } from './entities/project-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTask])],
  controllers: [ProjectTasksController],
  providers: [ProjectTasksService],
  exports: [ProjectTasksService],
})
export class ProjectTasksModule {}
