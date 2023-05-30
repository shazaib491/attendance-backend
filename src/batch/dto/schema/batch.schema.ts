import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {  HydratedDocument } from 'mongoose';

export type BatchDocument = HydratedDocument<Batch>;

@Schema({ timestamps: true })
export class Batch {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  // student_id: string;

  @Prop({ required: true })
  main_language: string;

  @Prop({ required: true })
  techs: string[];

  @Prop()
  course_name: string;

  // @Prop({ required: true })
  // latitude: number;

  // @Prop({ required: true })
  // longitude: number;

  @Prop({ required: true })
  teacher_name: string;

  @Prop({ required: true })
  class_name: string;
}

export const BatchSchema = SchemaFactory.createForClass(Batch);
