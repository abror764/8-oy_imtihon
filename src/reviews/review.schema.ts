import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ collection: 'reviews' })
export class Review {
  @Prop({ unique: true })
  seqId: number;

  @Prop()
  userId: number;

  @Prop()
  productId: number;

  @Prop()
  name: string;

  @Prop()
  stars: number;

  @Prop()
  comment: string;

  @Prop({ nullable: true })
  profileImage?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);