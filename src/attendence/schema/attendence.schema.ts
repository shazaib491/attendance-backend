import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ default: false })
  present: boolean;

  @Prop({ default: false })
  absent: boolean;

  @Prop({ default: false })
  half: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  student_id: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
