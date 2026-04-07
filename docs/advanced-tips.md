---
sidebar_position: 7
---

# 🧠 Advanced Tips

- **Custom filters:** call `service.find(filter, query)` to run the
  standard pipeline on a subset of documents.
- **Custom lookups:** override `findAll`, `findOne`, etc. and call
  `super.findAll(query)` if you need base behaviour as a starting point.
- **Type safety:** generics ensure returned data is correctly typed when
  you extend `BaseCrudService<T>` and supply a DTO to controller
  config.
- **Error handling:** `NotFoundException` is thrown automatically when a
  requested document is missing.
