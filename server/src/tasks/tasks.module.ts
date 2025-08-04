import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './task.model';
import { ApplicationsModule } from '../applications/applications.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ApplicationsModule,
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
