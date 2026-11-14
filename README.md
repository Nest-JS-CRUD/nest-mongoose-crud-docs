# nest-mongoose-crud Documentation

[![npm version](https://img.shields.io/npm/v/nest-mongoose-crud?label=nest-mongoose-crud)](https://www.npmjs.com/package/nest-mongoose-crud)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js >= 20](https://img.shields.io/badge/Node.js-%3E%3D%2020-green)](https://nodejs.org/)

**Official documentation site for [`nest-mongoose-crud`](https://www.npmjs.com/package/nest-mongoose-crud)** — a zero-boilerplate CRUD helper library for building RESTful APIs with NestJS and Mongoose.

> This repo contains the **documentation website only**. For the package source code, see [`Nest-JS-CRUD/nest-mongoose-crud`](https://github.com/Nest-JS-CRUD/nest-mongoose-crud).

---

## 📖 What is this repo?

This repository hosts the **Docusaurus-based documentation site** for the `nest-mongoose-crud` npm package. The package provides:

- **`BaseCrudService`** — A typed base service class that eliminates boilerplate for common CRUD operations
- **`createCrudController`** — A factory function that generates REST controllers with zero configuration
- **`APIFeatures`** — Advanced query support (filtering, sorting, pagination, search, population)

The documentation here covers:
- Quick setup and basic usage
- Complete API reference with queryable examples
- Advanced customization and extension patterns
- Running and developing the package locally

---

## 🛠 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| **Docusaurus** | 3.9.2 | Static site generator for documentation |
| **React** | 19 | UI rendering |
| **TypeScript** | 5.6 | Type-safe configuration and pages |
| **Algolia DocSearch** | Latest | Fast documentation search |
| **Prism React Renderer** | 2 | Syntax highlighting (VS Dark theme) |

**Required Node version:** Node.js >= 20.0

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 20.0 (check with `node --version`)
- **npm** (comes with Node.js, check with `npm --version`)
- **Git** (for cloning and contributing)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Nest-JS-CRUD/nest-mongoose-crud.git
cd nest-mongoose-crud/docs  # or the path to this repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run start
```

The site will open automatically at **[http://localhost:3000](http://localhost:3000)** with hot reload enabled. Any changes to Markdown files or React components will refresh instantly.

### 4. Open in your browser

Navigate to `http://localhost:3000` and explore the documentation.

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the local dev server at http://localhost:3000 (hot reload) |
| `npm run build` | Build the site for production to the `build/` folder |
| `npm run serve` | Serve the production build locally (run `build` first) |
| `npm run deploy` | Deploy to GitHub Pages (requires `GIT_USER` env var) |
| `npm run typecheck` | Type-check TypeScript files |
| `npm run clear` | Clear Docusaurus cache and generated files |

---

## 📁 Project Structure

```
nest-mongoose-crud-docs/
├── README.md                        # This file
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── docusaurus.config.ts             # Main Docusaurus config (navbar, footer, etc.)
├── sidebars.ts                      # Documentation sidebar layout
│
├── docs/                            # ✨ All documentation content (Markdown)
│   ├── intro.md                     # Getting started & installation
│   ├── quick-start.md               # 4-step setup guide (schema → service → controller → module)
│   ├── schema-reference.md          # Product & Category schema definitions & DTOs
│   ├── querying.md                  # APIFeatures query reference (filtering, sorting, pagination, search)
│   ├── controller-configuration.md  # createCrudController config interface
│   ├── overrides.md                 # Extending & overriding service/controller behavior
│   ├── utilities.md                 # Exported utilities & API reference
│   ├── advanced-tips.md             # Custom filters, type safety, error handling
│   └── development.md               # Running & developing the package locally
│
├── src/                             # React components & custom pages
│   ├── pages/
│   │   ├── index.tsx                # Custom homepage with hero, features, metrics
│   │   └── index.module.css
│   ├── components/
│   │   └── HomepageFeatures/        # Feature cards section
│   ├── css/
│   │   └── custom.css               # Custom styling
│   └── theme/
│       └── DocItem/                 # Docusaurus theme overrides
│
├── static/                          # Static assets (images, icons)
│   └── img/
│       ├── logo.PNG, logo.svg       # Project logo
│       └── favicon.ico
│
└── blog/                            # Blog folder (disabled in config)
```

---

## 📚 Documentation Content Overview

The docs are organized into **3 main categories**:

### 1️⃣ Get Started
- **[intro.md](./docs/intro.md)** — What is `nest-mongoose-crud` and why use it? Installation instructions.
- **[quick-start.md](./docs/quick-start.md)** — 4-step walkthrough: define schemas → create service → generate controller → wire module.

### 2️⃣ Use the Package
- **[querying.md](./docs/querying.md)** — Complete `APIFeatures` reference: filtering, sorting, pagination, search, population, field limiting.
- **[controller-configuration.md](./docs/controller-configuration.md)** — `createCrudController` API and per-endpoint configuration.
- **[schema-reference.md](./docs/schema-reference.md)** — Full `Product` and `Category` example schemas, DTOs, and practical queries.

### 3️⃣ Customize & Extend
- **[overrides.md](./docs/overrides.md)** — How to override service methods and controller routes.
- **[utilities.md](./docs/utilities.md)** — All exported functions and classes: `BaseCrudService`, `createCrudController`, `APIFeatures`, etc.
- **[advanced-tips.md](./docs/advanced-tips.md)** — Advanced patterns: custom filters, type safety, error handling.
- **[development.md](./docs/development.md)** — Running the bundled test project, `npm link`, license info.

---

## 🔑 Environment Variables (Optional)

To enable **Algolia DocSearch** in local development, create a `.env.local` file in the root:

```bash
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_search_key
ALGOLIA_INDEX_NAME=your_algolia_index_name
```

If these are not set, the site will use **fallback default values** and search will still work locally. For production search, contact the Algolia support team or update the config in `docusaurus.config.ts`.

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Editing Documentation

1. **Navigate to the docs folder**: All documentation is in `/docs` as Markdown files.
2. **Make your changes**: Edit any `.md` file directly.
   - Use **Markdown syntax** for formatting
   - Include **code examples** where helpful
   - Reference the `Product` and `Category` example schemas when demonstrating features
3. **Test locally**: Run `npm run start` and view your changes at http://localhost:3000
4. **Submit a pull request**: Commit your changes and push to GitHub.

### Adding a New Documentation Page

1. **Create a new `.md` file** in the `/docs` folder:
   ```bash
   touch docs/my-new-page.md
   ```

2. **Add frontmatter** (metadata) at the top:
   ```markdown
   ---
   sidebar_position: 9
   ---

   # My New Page Title

   Your content here...
   ```

3. **Update the sidebar**: Edit `sidebars.ts` to include your new page in the appropriate category.

4. **Test locally**: Run `npm run start` and verify it appears in the sidebar.

5. **Submit a PR**: Commit and push your changes.

### Other Contribution Ideas

- Fix typos or improve clarity in existing docs
- Add more examples or use cases
- Improve code syntax highlighting
- Report issues or suggest features

---

## 🔗 Useful Links

| Link | Purpose |
|------|---------|
| [npm: nest-mongoose-crud](https://www.npmjs.com/package/nest-mongoose-crud) | Package on npm registry |
| [GitHub: nest-mongoose-crud](https://github.com/Nest-JS-CRUD/nest-mongoose-crud) | Package source code & issues |
| [Live Documentation](https://your-nest-mongoose-crud-site.example.com) | Production documentation site |
| [NestJS Documentation](https://docs.nestjs.com/) | Official NestJS docs |
| [Mongoose Documentation](https://mongoosejs.com/) | Official Mongoose docs |

---

## 📄 License

This documentation site and the `nest-mongoose-crud` package are licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 💡 Quick Tips for First-Time Users

1. **Start with [intro.md](./docs/intro.md)** to understand what the package does.
2. **Follow [quick-start.md](./docs/quick-start.md)** for a hands-on 4-step setup.
3. **Use [querying.md](./docs/querying.md)** as a reference when building API endpoints.
4. **Check [overrides.md](./docs/overrides.md)** when you need custom logic.
5. **Run `npm run start`** and use the local site for fast feedback.

---

**Happy documenting! 🎉**
