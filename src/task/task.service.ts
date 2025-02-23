import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { PrismaService } from 'src/infra/config/prisma/prisma.service';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(task: TaskDto) {
    return this.prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        expirationDate: new Date().toISOString(),
        id: UUID(),
      },
    });
  }

  async update(task: TaskDto) {
    // if exists, update the task
    // if the data from user is undefined use the tada from database to update
    return this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        expirationDate: task.expirationDate,
      },
    });
  }

  getById(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  getAll() {
    return this.prisma.task.findMany();
  }

  delete(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
