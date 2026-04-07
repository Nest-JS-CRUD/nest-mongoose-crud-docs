---
sidebar_position: 5
---

# Override Examples

The following shows a simple way to override a generated endpoint by
providing a custom service method and a controller handler. You can
either override a handler via the `createCrudController` options
(`handler`), or replace the route entirely by extending the base
controller — this example demonstrates a common pattern: custom service
logic plus an explicit controller method that calls it.

```ts
// src/product/product.service.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Product, ProductDocument } from './schemas/product.schema';

// DTOs
import { CreateProductUpdated } from './dto/create-product-update.dto';

import { BaseCrudService } from 'nest-mongoose-crud';

@Injectable()
export class ProductService extends BaseCrudService<ProductDocument> {
  constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
    super(productModel);
  }

  create(updateProductDto: CreateProductUpdated) {
    return 'create one updated!!';
  }
}
```

```ts
// src/product/product.controller.ts
import {
  Body,
  Controller,
  Post,
  Type,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { createCrudController } from 'nest-mongoose-crud';

import { ProductService } from './product.service';

// DTOs
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUpdated } from './dto/create-product-update.dto';

// Interceptors
import { LogRequest1Interceptor } from './interceptors/log-request-1/log-request-1.interceptor';
import { LogRequest2Interceptor } from './interceptors/log-request-2/log-request-2.interceptor';

// Guards
import { LogRequest1Guard } from './guards/log-request-1/log-request-1.guard';
import { LogRequest2Guard } from './guards/log-request-1/log-request-2.guard';

const BaseController = createCrudController({
  create: {
    dto: CreateProductDto,
    interceptors: [LogRequest1Interceptor, LogRequest2Interceptor],
  },

  update: {
    dto: UpdateProductDto,
  },

  getAll: {
    guards: [LogRequest1Guard, LogRequest2Guard],
    interceptors: [LogRequest1Interceptor, LogRequest2Interceptor],
  },
});

@Controller('products')
export class ProductController extends BaseController {
  constructor(private service: ProductService) {
    super(service);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  create(@Body() dto: CreateProductUpdated) {
    return this.service.create(dto);
  }
}
```

This snippet demonstrates:

- overriding service behaviour by extending `BaseCrudService`;
- exposing a custom controller route that delegates to the service;
- mixing generated options (via `createCrudController`) with explicit
  controller methods when you need full control.
