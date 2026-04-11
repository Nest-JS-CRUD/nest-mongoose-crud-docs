import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const quickLinks = [
  {
    title: 'Quick start',
    description:
      'Install the package, define a schema, and expose CRUD endpoints in minutes.',
    to: '/docs/quick-start',
  },
  {
    title: 'Querying',
    description:
      'Use filtering, sorting, pagination, search, field selection, and population.',
    to: '/docs/querying',
  },
  {
    title: 'Overrides',
    description:
      'Customize generated behavior without losing the speed of the built-in CRUD layer.',
    to: '/docs/overrides',
  },
];

const stats = [
  { value: 'BaseCrudService', label: 'for typed service primitives' },
  { value: 'createCrudController', label: 'for fast controller generation' },
  { value: 'APIFeatures', label: 'for query-driven filtering and population' },
];

const capabilities = [
  'Typed CRUD service foundation for NestJS + Mongoose',
  'Factory-generated controllers with room for overrides',
  'URL-based filtering, sorting, search, pagination, and populate',
  'Schema-friendly docs with DTO and controller examples',
];

const workflow = [
  {
    step: '01',
    title: 'Define your schema',
    body: 'Start from your Mongoose model and keep your domain shape central.',
  },
  {
    step: '02',
    title: 'Extend the service',
    body: 'Plug your model into BaseCrudService and inherit the common operations.',
  },
  {
    step: '03',
    title: 'Generate the controller',
    body: 'Create CRUD endpoints quickly, then override only the behavior you need.',
  },
];

const heroTitle = 'Build Production-Ready CRUD APIs Faster.';
const installCommand = 'npm install nest-mongoose-crud';

function AnimatedMetric({
  target,
  suffix = '',
  duration = 2600,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target);
      return;
    }

    const start = window.performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, target]);

  return (
    <strong>
      {value}
      {suffix}
    </strong>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [typedTitle, setTypedTitle] = useState('');
  const [installCopied, setInstallCopied] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTypedTitle(heroTitle);
      return;
    }

    let currentIndex = 0;
    let timeoutId: number;

    const tick = () => {
      currentIndex += 1;
      setTypedTitle(heroTitle.slice(0, currentIndex));

      if (currentIndex >= heroTitle.length) {
        return;
      }

      timeoutId = window.setTimeout(tick, 85);
    };

    timeoutId = window.setTimeout(tick, 300);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(styles.revealed);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!installCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setInstallCopied(false), 1800);

    return () => window.clearTimeout(timeoutId);
  }, [installCopied]);

  const handleInstallCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setInstallCopied(true);
    } catch {
      setInstallCopied(false);
    }
  };

  return (
    <Layout
      title={`${siteConfig.title} documentation`}
      description="Documentation for nest-mongoose-crud with quick start guides, querying reference, and controller configuration."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroInner}>
            <div
              className={styles.heroCopy}
              data-reveal=""
              style={{ '--reveal-delay': '0ms' } as CSSProperties}
            >
              <p className={styles.eyebrow}>NestJS + Mongoose CRUD toolkit</p>
              <h1 className={styles.title} aria-label={heroTitle}>
                <span aria-hidden="true">{typedTitle}</span>
                <span className={styles.caret} aria-hidden="true" />
              </h1>
              <p className={styles.subtitle}>
                `nest-mongoose-crud` gives you a typed service base, a
                controller factory, and query helpers that feel native to NestJS
                and Mongoose.
              </p>
              <div className={styles.actions}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/quick-start"
                >
                  Start building
                </Link>
                <Link
                  className="button button--outline button--lg"
                  to="/docs/querying"
                >
                  Explore querying
                </Link>
              </div>
              <button
                type="button"
                className={styles.installCard}
                onClick={handleInstallCopy}
                aria-label={`Copy command: ${installCommand}`}
              >
                <span className={styles.installLabel}>Install</span>
                <code className={styles.installCode}>{installCommand}</code>
                <span className={styles.installAction} aria-live="polite">
                  {installCopied ? 'Copied' : 'Copy'}
                </span>
              </button>
            </div>

            <div
              className={styles.heroVisual}
              data-reveal=""
              style={{ '--reveal-delay': '120ms' } as CSSProperties}
            >
              <div className={styles.terminalCard}>
                <div className={styles.terminalTop}>
                  <span className={styles.terminalDots}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>product.service.ts</span>
                </div>
                <div className={styles.terminalBody}>
                  <CodeBlock language="ts">{`@Injectable()
export class ProductService extends BaseCrudService<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    model: Model<ProductDocument>,
  ) {
    super(model);
  }
}`}</CodeBlock>
                </div>
              </div>

              <div className={styles.dashboardCard}>
                <div className={styles.dashboardHeader}>
                  <p>
                    <span className={styles.dashboardLabel}>Request</span>
                    GET /products
                  </p>
                  <span className={styles.dashboardPill}>200 OK</span>
                </div>
                <div className={styles.dashboardQuery}>
                  <code>
                    ?isActive=true&amp;sort=-rating&amp;populate=category:name
                  </code>
                </div>
                <div className={styles.dashboardMetrics}>
                  <article>
                    <AnimatedMetric target={12} />
                    <span>results</span>
                  </article>
                  <article>
                    <AnimatedMetric target={34} suffix="ms" />
                    <span>query time</span>
                  </article>
                  <article>
                    <strong>typed</strong>
                    <span>response flow</span>
                  </article>
                </div>
                <ul className={styles.capabilityList}>
                  {capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <article
                key={stat.value}
                className={styles.statCard}
                data-reveal=""
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
              >
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div
            className={styles.sectionIntro}
            data-reveal=""
            style={{ '--reveal-delay': '0ms' } as CSSProperties}
          >
            <p className={styles.eyebrow}>How it fits together</p>
            <h2 className={styles.sectionTitle}>
              A small set of primitives, wired around the way NestJS apps
              already work.
            </h2>
            <p className={styles.sectionBody}>
              The package focuses on the repetitive layer: model-backed
              services, generated controllers, and request query parsing. Your
              own modules, guards, DTOs, and business logic still stay in
              charge.
            </p>
          </div>

          <div className={styles.workflowGrid}>
            {workflow.map((item, index) => (
              <article
                key={item.step}
                className={styles.workflowCard}
                data-reveal=""
                style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
              >
                <p className={styles.workflowStep}>{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.linkSection}>
          <div
            className={styles.sectionIntro}
            data-reveal=""
            style={{ '--reveal-delay': '0ms' } as CSSProperties}
          >
            <p className={styles.eyebrow}>Documentation</p>
            <h2 className={styles.sectionTitle}>
              Jump into the part you need.
            </h2>
          </div>
          <div className={styles.linkGrid}>
            {quickLinks.map((link, index) => (
              <Link
                key={link.title}
                className={styles.linkCard}
                to={link.to}
                data-reveal=""
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
              >
                <p className={styles.linkTitle}>{link.title}</p>
                <p className={styles.linkDescription}>{link.description}</p>
                <span className={styles.linkArrow}>Open guide</span>
              </Link>
            ))}
          </div>
        </section>

        <div
          data-reveal=""
          style={{ '--reveal-delay': '40ms' } as CSSProperties}
        >
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
