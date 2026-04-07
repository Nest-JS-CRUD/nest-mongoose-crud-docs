import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';
import styles from './styles.module.css';

export default function DocItemTOCDesktop(): React.ReactNode {
  const { toc, frontMatter } = useDoc();

  return (
    <aside className={styles.tocCard}>
      <p className={styles.tocTitle}>On this page</p>
      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={styles.tocList}
      />
    </aside>
  );
}
