import fs from 'node:fs';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const localEnvPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(localEnvPath)) {
  const envEntries = fs
    .readFileSync(localEnvPath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  for (const entry of envEntries) {
    const separatorIndex = entry.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = entry.slice(0, separatorIndex).trim();
    const value = entry
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const config: Config = {
  title: 'nest-mongoose-crud',
  tagline: 'Fast, extensible CRUD helpers for NestJS + Mongoose',
  favicon: 'img/logo-favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-nest-mongoose-crud-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Nest-JS-CRUD', // Usually your GitHub org/user name.
  projectName: 'nest-mongoose-crud', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Nest-JS-CRUD/nest-mongoose-crud/edit/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.PNG',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'nest-mongoose-crud Logo',
        src: 'img/logo.PNG',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/quick-start',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/docs/querying',
          label: 'Querying',
          position: 'left',
        },
        {
          to: '/docs/schema-reference',
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://www.npmjs.com/package/nest-mongoose-crud',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/Nest-JS-CRUD/nest-mongoose-crud',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Get started',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Quick start',
              to: '/docs/quick-start',
            },
            {
              label: 'Development',
              to: '/docs/development',
            },
          ],
        },
        {
          title: 'Core guides',
          items: [
            {
              label: 'Querying',
              to: '/docs/querying',
            },
            {
              label: 'Controller configuration',
              to: '/docs/controller-configuration',
            },
            {
              label: 'Schema reference',
              to: '/docs/schema-reference',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/nest-mongoose-crud',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Nest-JS-CRUD/nest-mongoose-crud',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} nest-mongoose-crud.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['typescript', 'bash', 'json'],
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID!,
      apiKey: process.env.ALGOLIA_API_KEY!,
      indexName: process.env.ALGOLIA_INDEX_NAME!,
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
