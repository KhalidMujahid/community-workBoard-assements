import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/users.model';
import { RolesGuard } from '../common/guards/roles.guard';
import type { UserRequest } from '../common/interfaces/user-request.interface';
import { Types } from 'mongoose';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Roles(UserRole.Contributor)
  @UseGuards(RolesGuard)
  async create(@Body() task: any, @Request() request: UserRequest) {
    const createdBy = new Types.ObjectId(request.user._id);
    console.log('here', createdBy);
    return this.tasksService.create(task, createdBy);
  }

  @Get()
  @Roles(UserRole.Volunteer)
  @UseGuards(RolesGuard)
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('my-posted-tasks')
  @Roles(UserRole.Contributor)
  @UseGuards(RolesGuard)
  async findByUser(@Request() req: UserRequest) {
    const id = new Types.ObjectId(req.user._id);
    return this.tasksService.findByUser(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }
}
