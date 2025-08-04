import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
