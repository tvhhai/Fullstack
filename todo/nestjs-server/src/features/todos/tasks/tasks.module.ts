import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { SectionTasksModule } from '@features/todos/section-tasks/section-tasks.module';
import { ProjectTasksModule } from '@features/todos/project-tasks/project-tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    SectionTasksModule,
    ProjectTasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
