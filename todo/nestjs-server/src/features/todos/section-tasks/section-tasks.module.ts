import { Module } from '@nestjs/common';
import { SectionTasksService } from './section-tasks.service';
import { SectionTasksController } from './section-tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionTask } from './entities/section-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionTask])],
  controllers: [SectionTasksController],
  providers: [SectionTasksService],
  exports: [SectionTasksService],
})
export class SectionTasksModule {}
