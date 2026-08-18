import { IsIn, IsOptional, IsString } from 'class-validator';

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['all', 'completed', 'incomplete'])
  status?: 'all' | 'completed' | 'incomplete';
}
