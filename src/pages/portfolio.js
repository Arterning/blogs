import React from 'react';
import Layout from '@theme/Layout';

import styles from './portfolio.module.css';

const projects = [
  {
    name: 'easy-bi',
    description: '轻量级 BI 报表系统 — 上传 Excel/CSV，写 SQL，出报表。零配置，开箱即用。',
    url: 'https://github.com/Arterning/easy-bi',
    tag: 'BI 报表系统',
  },
  {
    name: 'local-share',
    description: '局域网文件共享工具。',
    url: 'https://github.com/Arterning/local-share',
    tag: '文件共享',
  },
];

export default function Portfolio() {
  return (
    <Layout title="Portfolio" description="Ning 的开源作品集">
      <main className={styles.portfolioPage}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>MY WORK</span>
            <h1 className={styles.title}>Portfolio</h1>
            <p className={styles.subtitle}>一些我设计并开发的开源项目。</p>
          </div>
        </section>

        <section className={`container ${styles.projects}`} aria-label="作品列表">
          {projects.map((project, index) => (
            <article className={styles.card} key={project.name}>
              <div className={styles.cardTop}>
                <span className={styles.number}>0{index + 1}</span>
                <span className={styles.tag}>{project.tag}</span>
              </div>
              <h2 className={styles.projectName}>{project.name}</h2>
              <p className={styles.description}>{project.description}</p>
              <a
                className={styles.link}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer">
                查看 GitHub <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
