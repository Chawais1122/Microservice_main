import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: Date.now() })
  created_at: Date;

  @Prop({ default: Date.now() })
  updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
