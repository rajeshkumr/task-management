import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    this.logger.log('Fetching all tasks');
    return await this.taskRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    this.logger.log(`Fetching task with ID ${id}`);
    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      this.logger.warn(`Invalid ObjectId: ${id}`);
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    const savedTask = await this.taskRepository.save(task);

    this.logger.log(`Task created with ID ${savedTask.id}`);
    return savedTask;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.logger.log(`Updating task with ID ${id}`);

    const task = await this.getTaskById(id);
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);

    this.logger.log(`Task with ID ${id} updated successfully`);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    this.logger.log(`Deleting task with ID ${id}`);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } else {
      this.logger.log(`Task with ID ${id} deleted successfully`);
    }
  }
}
