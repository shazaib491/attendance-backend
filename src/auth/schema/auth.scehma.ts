import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  mobile: string;

  @Prop()
  age: number;

  @Prop({ default: true })
  user_status: boolean;

  @Prop({ default: 'student' })
  user_type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' })
  batch_id: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
