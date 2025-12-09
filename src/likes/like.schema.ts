import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ collection: 'likes' })
export class Like {
  @Prop({ unique: true })
  seqId: number; 

  @Prop()
  userId: number;

  @Prop()
  productId: number;

  @Prop({ default: true })
  liked: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const LikeSchema = SchemaFactory.createForClass(Like);