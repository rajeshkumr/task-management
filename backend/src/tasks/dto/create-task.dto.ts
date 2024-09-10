import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';
import { TaskStatus } from '../task.entity';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
