import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './application.model';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(
    taskId: string | null,
    userId: any,
    message: string,
  ): Promise<ApplicationDocument> {
    return this.applicationModel.create({ taskId, userId, message });
  }

  async findByTask(taskId: string): Promise<ApplicationDocument[]> {
    return this.applicationModel
      .find({ taskId })
      .populate('userId', 'name')
      .exec();
  }
}
