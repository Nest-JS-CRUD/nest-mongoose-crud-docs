---
sidebar_position: 1
---

# nest-mongoose-crud

> 🔧 **Fast, extensible CRUD helpers for NestJS + Mongoose**

`nest-mongoose-crud` is a zero‑boilerplate package that provides a
fully‑typed base service and configurable controller factory for
building RESTful CRUD APIs with NestJS and Mongoose. Built with developer
experience in mind, it handles filtering, pagination, sorting, searching,
and population out of the box while letting you override or extend any
behaviour.

This documentation uses a product catalog example with `Product` and
`Category` schemas to demonstrate real-world query patterns, controller
configuration, and customization.

## What you’ll find here

- Quick start guide for `Product` CRUD with `BaseCrudService`
- Detailed query examples for filters, sorting, pagination, search, and
  population
- Controller configuration and endpoint customization
- Override patterns for custom service logic and request handling
- A schema reference for `Product` and `Category`

## 📦 Installation

```bash
# using npm
npm install nest-mongoose-crud

# or yarn
yarn add nest-mongoose-crud
```

> Works with NestJS v8+ and Mongoose v6+.
