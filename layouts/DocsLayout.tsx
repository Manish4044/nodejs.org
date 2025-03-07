import { useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';

import SideNavigation from '@/components/SideNavigation';
import { useNodeReleases } from '@/hooks/useNodeReleases';

import BaseLayout from './BaseLayout';

const DocsLayout: FC<PropsWithChildren> = ({ children }) => {
  const { getReleaseByStatus, getLatestIsLtsRelease } = useNodeReleases();

  const [lts, current] = useMemo(
    () => [getLatestIsLtsRelease(), getReleaseByStatus('Current')],
    [getLatestIsLtsRelease, getReleaseByStatus]
  );

  const translationContext = {
    apiLts: {
      ltsNodeVersion: lts ? `v${lts.major}.x` : undefined,
      fullLtsNodeVersion: lts ? lts.versionWithPrefix : undefined,
      spanLts: <span className="small color-lightgray">LTS</span>,
    },
    apiCurrent: {
      fullCurrentNodeVersion: current ? current.versionWithPrefix : undefined,
      currentNodeVersion: current ? `v${current.major}.x` : undefined,
    },
    guides: {
      spanGuides: <span className="small color-lightgray">ARCHIVE</span>,
    },
  };

  return (
    <BaseLayout>
      <div className="has-side-nav container">
        <SideNavigation navigationKey="docs" context={translationContext} />
        <article dir="auto">{children}</article>
      </div>
    </BaseLayout>
  );
};

export default DocsLayout;
