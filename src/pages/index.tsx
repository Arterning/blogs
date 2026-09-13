import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">你好，我是 Ning</h1>
        <p className="hero__subtitle">
          一名创作者 —— 热爱音乐、写作与阅读，喜欢创作有趣的作品，
          也热衷于研究人工智能相关的技术。
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/notes/env">
            浏览笔记
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            逛逛博客
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="你好，我是 Ning"
      description="创作者 · 音乐 · 写作 · 阅读 · AI 技术研究">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}