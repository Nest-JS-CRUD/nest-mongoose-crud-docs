---
sidebar_position: 3
---

# 🔍 Querying

The `APIFeatures` class provides powerful querying capabilities for your CRUD APIs, allowing you to filter, sort, search, paginate, and populate your data efficiently. Below, each feature is explained in detail with practical examples using our Product model.

## Filtering

Filtering allows you to retrieve documents that match specific criteria. There are two types: basic filtering for exact matches and advanced filtering for range queries.

### Basic Filtering

For fields that accept multiple values (like enums, arrays, or booleans), use comma-separated values. This uses MongoDB's `$in` operator to match any of the provided values.

**Explanation:** This is useful for filtering by categories, statuses, tags, or any field where you want to include multiple options. The query parameter value is split by commas and converted to an `$in` array.

**Example:** Get products that are active.

```http
GET /products?isActive=true
```

**Example:** Get products with specific tags.

```http
GET /products?tags=electronics,gadgets,smartphone
```

**Example:** Get products from specific brands.

```http
GET /products?brand=Apple,Samsung,Sony
```

In our Product model, you can filter by:

- **Booleans:** `isActive`
- **Arrays:** `tags`, `images`
- **Strings:** `brand`, `name`, `description`
- **Relationships:** `category` (category ID)

### Advanced Filtering

For range queries and comparisons, use bracket notation with MongoDB comparison operators:

- `[gte]` - greater than or equal (`$gte`)
- `[gt]` - greater than (`$gt`)
- `[lte]` - less than or equal (`$lte`)
- `[lt]` - less than (`$lt`)
- `[ne]` - not equal to one or more values (`$nin`)

**Explanation:** These operators allow precise range filtering on numeric or date fields, along with exclusion filtering for values you want to leave out of the result set. The bracket notation `[operator]` is parsed to extract the field name and apply the corresponding MongoDB operator.

**Example:** Get products with price between $100 and $500.

```http
GET /products?price[gte]=100&price[lte]=500
```

**Example:** Get products with high ratings (above 4.0) and good stock (more than 10).

```http
GET /products?rating[gte]=4.0&stock[gt]=10
```

**Example:** Get products created in the last 30 days.

```http
GET /products?createdAt[gte]=2024-01-01
```

**Example:** Exclude products with draft or archived status.

```http
GET /products?status[ne]=draft,archived
```

This becomes the MongoDB filter:

```ts
{ status: { $nin: ['draft', 'archived'] } }
```

`[ne]` is useful when you want to exclude one or more values directly from the request query without writing custom filter logic in each service. The parser detects the `field[ne]` pattern, extracts the field name, splits the comma-separated value list, and converts it into a MongoDB `$nin` filter before the Mongoose query runs.

Note: Date fields should be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ). Our Product model has automatic `createdAt`/`updatedAt` timestamps.

You can combine multiple operators on the same field or different fields:

```http
GET /products?price[gte]=50&price[lte]=200&rating[gte]=3.5&stock[gte]=5
```

You can also combine exclusion filters with other query operators:

```http
GET /products?status[ne]=draft,archived&price[gte]=50&stock[gt]=0
```

## Sorting

Sort your results by one or more fields to control the order of returned documents.

**Explanation:** Separate multiple fields with commas. Prefix a field with `-` for descending order. If no sort is specified, results default to `-createdAt` (newest first). This uses MongoDB's `sort()` method.

**Example:** Sort products by price ascending.

```http
GET /products?sort=price
```

**Example:** Sort by rating descending, then by stock descending.

```http
GET /products?sort=-rating,-stock
```

**Example:** Sort by newest products first.

```http
GET /products?sort=-createdAt
```

For our Product model, you can sort by fields such as `name`, `price`, `stock`, `rating`, `createdAt`, and `updatedAt`.

## Limiting Fields

Control which fields are included or excluded in the response to optimize payload size and hide sensitive data.

**Explanation:** Use a comma-separated list of field names. By default, the `__v` field (Mongoose version key) is excluded. Prefix fields with `-` to exclude them instead of including only them. This uses MongoDB's `select()` method.

**Example:** Only return essential fields for a product list view.

```http
GET /products?fields=name,price,images,rating,brand
```

**Example:** Return all fields except description for performance.

```http
GET /products?fields=-description,-__v
```

**Example:** Get only catalog essentials.

```http
GET /products?fields=name,price,stock,rating
```

## Pagination

Split large result sets into manageable pages for better performance and user experience.

**Explanation:** Use `page` (default: 1) and `limit` (default: 10) parameters. The API calculates the skip value as `(page - 1) * limit`. The response includes pagination metadata like total count, current page, total pages, and next/previous page numbers.

**Example:** Get the second page with 20 products per page.

```http
GET /products?page=2&limit=20
```

This skips the first 20 documents and returns documents 21-40.

**Example:** Get active products with pagination.

```http
GET /products?isActive=true&page=1&limit=12
```

## Searching

Perform case-insensitive text searches across multiple fields using regex.

**Explanation:** The format is `?search=searchTerm:field1,field2,field3`. The search term is applied as a regex pattern to each specified field, combined with MongoDB's `$or` operator. This is efficient when fields have text indexes.

**Example:** Search for "laptop" in the name or description fields.

```http
GET /products?search=laptop:name,description
```

**Example:** Search across name, description, and brand.

```http
GET /products?search=wireless:name,description,brand
```

**Example:** Search by brand for specific companies.

```http
GET /products?search=apple:brand
```

This creates: `{ $or: [{ name: { $regex: 'laptop', $options: 'i' } }, { description: { $regex: 'laptop', $options: 'i' } }] }`

In our Product model, you can search in `name`, `description`, `brand`, or array fields like `tags`.

## Population

Populate referenced documents to include related data in your response, avoiding multiple queries.

**Explanation:** Start by passing the reference path. If you do not specify fields, the populated document includes all fields from the related model. You can then add a field list to limit the response and reduce payload size. Use `|` to separate multiple population paths. Population occurs after filtering, sorting, etc., for optimal performance.

**Format without field selection:** `?populate=path`

**Example:** Populate the category field and return all category fields.

```http
GET /products?populate=category
```

**Format:** `?populate=path:field1,field2,field3`

**Example:** Populate the category field, but only include name and description from the Category model.

```http
GET /products?populate=category:name,description
```

**Example:** Get category details and image for product displays.

```http
GET /products?populate=category:name,description,image,isActive
```

**Format for multiple populations:** `?populate=path1|path2:field1,field2`

**Example:** Populate multiple relationships at once. Paths without field selection return all fields; paths with `:field1,field2` return only the selected fields.

```http
GET /products?populate=category|supplier:name,email
```

**Example:** Populate multiple paths and keep the category payload small.

```http
GET /products?populate=category:name,description|supplier:name,email|owner
```

In our Product model, `category` references the Category model. Using `?populate=category` returns the full populated category document. Adding `:field1,field2` limits the populated data to only those fields.

**Example:** Combine with other queries - get active products from active categories.

```http
GET /products?isActive=true&populate=category:isActive&category.isActive=true
```
