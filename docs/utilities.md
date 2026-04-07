---
sidebar_position: 6
---

# 📦 Additional Utilities

Although the service + controller factory is the primary API, the
package also exports:

```ts
export { BaseCrudService } from './utils/base-crud.service';
export { createCrudController } from './utils/create-crud.controller.utils';
export { BaseCrudController } from './utils/base-crud.controller';
export { APIFeatures } from './utils/apiFeatures.utils';
export * from './utils/interfaces/*';
```

`BaseCrudController` is an abstract class you can extend if you prefer
manual decorator application rather than the factory. `APIFeatures` can
be reused if you build custom query logic.

There is also a legacy `handlerFactory` / `AbstractCrudService` in
`handlerFactory.utils.ts` which implements similar operations; it is
maintained for backwards compatibility but the newer `BaseCrudService`
and `createCrudController` are recommended for all new work.
