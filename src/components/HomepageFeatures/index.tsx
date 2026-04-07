import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  body: string;
};

const features: FeatureItem[] = [
  {
    title: 'Zero boilerplate services',
    body: 'Extend BaseCrudService once and keep the rest of your module setup predictable.',
  },
  {
    title: 'URL-driven querying',
    body: 'Filter, sort, paginate, search, and populate records through a compact query API.',
  },
  {
    title: 'Controller factory support',
    body: 'Generate CRUD endpoints quickly, then override the pieces that need custom behavior.',
  },
  {
    title: 'Typed NestJS patterns',
    body: 'Reuse your DTOs, schemas, and guards without losing TypeScript ergonomics.',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>What the docs cover</p>
          <Heading as="h2" className={styles.title}>
            Built for fast scanning, not just long reading.
          </Heading>
          <p className={styles.description}>
            The docs keep the API surface practical: start with setup, move into
            real query examples, then customize controllers and overrides when your
            app needs more control.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <article key={feature.title} className={styles.card}>
              <p className={styles.cardIndex}>Guide</p>
              <Heading as="h3" className={styles.cardTitle}>
                {feature.title}
              </Heading>
              <p className={styles.cardBody}>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
