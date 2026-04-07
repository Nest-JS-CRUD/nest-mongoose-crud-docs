---
sidebar_position: 2
---

# 🚀 Quick Start

## 1. Define your schema & model

### Product schema

```ts
// src/product/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop()
  brand: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop([String])
  tags: string[];

  @Prop([String])
  images: string[];

  @Prop({ default: 0 })
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

### Category schema

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
```

## 2. Create a service by extending `BaseCrudService`

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseCrudService } from 'nest-mongoose-crud';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService extends BaseCrudService<ProductDocument> {
  constructor(@InjectModel(Product.name) model: Model<ProductDocument>) {
    super(model);
  }
}
```

All of the common operations (`findAll`, `findOne`, `createOne`,
`updateOne`, `deleteOne`) are implemented for you and return consistent
response shapes.

## 3. Generate a controller with `createCrudController`

```ts
import { Controller } from '@nestjs/common';
import { createCrudController } from 'nest-mongoose-crud';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const BaseController = createCrudController({
  create: { dto: CreateProductDto },
  update: { dto: UpdateProductDto },
});

@Controller('products')
export class ProductController extends BaseController {
  constructor(protected readonly service: ProductService) {
    super(service);
  }
}
```

## 4. Wire everything up in a module

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from '../category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
```
