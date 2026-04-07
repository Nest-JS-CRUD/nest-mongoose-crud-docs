---
sidebar_position: 4
---

# 🛠 Controller Configuration

`createCrudController` accepts a configuration object allowing you to
enhance or disable each CRUD endpoint and apply guards, pipes,
interceptors, custom status codes, and DTO validation.

```ts
interface EndpointConfig {
  dto?: DtoClass; // class used by ValidationPipe
  guards?: any[];
  interceptors?: any[];
}

interface CrudControllerConfig {
  create?: EndpointConfig;
  update?: EndpointConfig;
  delete?: EndpointConfig;
  getAll?: EndpointConfig;
  getOne?: EndpointConfig;
}
```

## Example – add guards and interceptors to `getAll` and `create`

```ts
const BaseController = createCrudController({
  getAll: {
    guards: [AdminGuard, SomeOtherGuard, ...],
    interceptors: [CacheInterceptor, SomeOtherInterceptor, ...],
  },
  create: { dto: CreateProductDto },
});
```

## Override validation options

```ts
const BaseController = createCrudController({
  create: {
    dto: CreateProductDto,
  },
});
```
