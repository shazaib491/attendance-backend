import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  loginKey: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ loginKey: 1 }, { expireAfterSeconds: 3600 });
