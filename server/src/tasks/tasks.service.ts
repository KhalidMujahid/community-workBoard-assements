import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    task: Partial<Task>,
    user: Types.ObjectId,
  ): Promise<TaskDocument> {
    const createdTask = new this.taskModel({
      ...task,
      createdBy: user,
    });
    return createdTask.save();
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel
      .find()
      .populate('createdBy', 'name email')
      .lean()
      .exec();
  }

  async findByUser(userId: Types.ObjectId): Promise<TaskDocument[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.taskModel
      .find({ createdBy: userId })
      .populate('createdBy', 'name email')
      .lean()
      .exec();
  }

  async findById(id: string): Promise<TaskDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Task not found');
    }

    const task = await this.taskModel
      .findById(id)
      .populate('createdBy', 'name email role')
      .lean()
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findByIdAndOwner(id: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel
      .findOne({
        _id: id,
        createdBy: userId,
      })
      .populate('createdBy', 'name email')
      .lean()
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found or you are not the owner');
    }
    return task;
  }
}
