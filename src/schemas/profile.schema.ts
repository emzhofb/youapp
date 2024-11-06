// src/schemas/profile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  horoscope: string;

  @Prop({ required: true })
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop([String])
  interest: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
