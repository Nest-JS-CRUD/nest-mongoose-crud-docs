import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import styles from './styles.module.css';

function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

function DocPageHeader() {
  const { metadata } = useDoc();
  const breadcrumbs = useSidebarBreadcrumbs();
  const [copied, setCopied] = useState(false);

  const sectionLabel = useMemo(() => {
    const category = breadcrumbs?.find((item) => item.type === 'category');
    return category?.label ?? 'Documentation';
  }, [breadcrumbs]);

  async function handleCopyPage() {
    if (typeof navigator === 'undefined') {
      return;
    }

    const url = window.location.origin + metadata.permalink;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className={styles.pageHeader}>
      <div>
        <p className={styles.sectionEyebrow}>Documentation</p>
        <p className={styles.sectionLabel}>{sectionLabel}</p>
      </div>
      <button className={styles.copyButton} type="button" onClick={handleCopyPage}>
        {copied ? 'Copied' : 'Copy page'}
      </button>
    </div>
  );
}

export default function DocItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article className={styles.docArticle}>
            <DocPageHeader />
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && (
        <div className={clsx('col col--3', styles.tocColumn)}>
          {docTOC.desktop}
        </div>
      )}
    </div>
  );
}
