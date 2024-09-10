import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity'; // Import the Task entity

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register Task entity
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
