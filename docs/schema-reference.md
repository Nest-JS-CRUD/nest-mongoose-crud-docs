---
sidebar_position: 2.5
---

# 🧱 Schema Reference

This page uses the `Product` and `Category` schemas as a working example for
how to model your NestJS + Mongoose domain while taking full advantage of
`nest-mongoose-crud`.

## Product schema overview

```ts
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
```

### Field categories

- `name`, `description`, `brand`
  - Text fields used for display, search, and filtering.
- `price`, `rating`, `stock`
  - Numeric fields used for sorting, range filtering, and inventory logic.
- `isActive`
  - Boolean control used for visibility and active/inactive state.
- `tags`, `images`
  - Arrays used for discovery and richer product responses.
- `category`
  - Relationship field referencing the `Category` collection.

### Why this schema works well with CRUD helpers

- `required` fields such as `name`, `price`, and `category` make validation
  straightforward for create/update DTOs.
- `isActive` is ideal for filtering visible vs. archived products.
- Numeric fields like `price`, `rating`, and `stock` support the advanced
  query operators used by `APIFeatures`.
- Array fields support multi-value filtering with comma-separated query
  parameters.

## Category schema overview

```ts
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
```

### Category field notes

- `name` is unique and required, making it a strong candidate for a category
  lookup endpoint.
- `isActive` can be used to disable categories while preserving associated
  product data.
- `image` allows category listing pages to show a visual avatar or icon.

## Recommended DTO shapes

### CreateProductDto

```ts
export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
  stock?: number;
  isActive?: boolean;
  tags?: string[];
  images?: string[];
  rating?: number;
}
```

### UpdateProductDto

```ts
export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  stock?: number;
  isActive?: boolean;
  tags?: string[];
  images?: string[];
  rating?: number;
}
```

## Practical use cases

- Use `ProductService` to quickly expose endpoints for product catalogs,
  inventory management, and storefront product search.
- Use `Category` population to return category names inside product
  list responses without extra client-side queries.
- Use `isActive`, `brand`, and `tags` to power storefront filters and admin
  dashboards.

## Schema-driven query examples

### Filter active products under $100

```http
GET /products?isActive=true&price[lte]=100
```

### Find electronics with strong reviews

```http
GET /products?tags=electronics&rating[gte]=4.0
```

### Search by name and category

```http
GET /products?search=wireless:name,description&category=644d1f1ff4a4b23f8c6f9b67
```

### Load category metadata with product results

```http
GET /products?populate=category:name,image,description
```
