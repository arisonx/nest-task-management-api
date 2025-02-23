import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

// define task endpoint
@Controller('task')
// define controller
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto) {
    await this.taskService.create(task);
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    const task: TaskDto | null = await this.taskService.getById(id);

    if (!task) {
      return new NotFoundException('Task not found');
    }

    return task;
  }

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTask: TaskDto) {
    const task: TaskDto | null = await this.taskService.getById(id);

    if (!task) {
      return new NotFoundException('Task not found');
    }

    if (!updateTask.id) {
      updateTask.id = id;
    }

    await this.taskService.update(updateTask);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const task: TaskDto | null = await this.taskService.getById(id);

    if (!task) {
      return new NotFoundException('Task not found');
    }

    await this.taskService.delete(id);
  }
}
