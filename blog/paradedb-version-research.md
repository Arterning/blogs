# 新环境 PostgreSQL / ParadeDB 版本选型调研

调研日期：2026-10-21。

部署场景：将 LDA 平台部署到新的麒麟 ARM64 环境，不涉及旧数据库数据迁移；希望兼顾可靠性、较长支持周期以及全文检索、中文分词、向量检索需求。

## 1. 推荐结论

推荐将以下组合作为新环境验收候选：

```yaml
image: paradedb/paradedb:0.26.2-pg17
platform: linux/arm64
```

该组合使用 PostgreSQL 17，官方支持至 2029-11-08；镜像提供 ARM64 版本，包含 pg_search 和 pgvector，功能覆盖项目现有检索需求。

这是根据官方版本信息、镜像元数据及项目代码作出的选型建议，**尚未完成该版本在 LDA 平台上的完整业务验收，不等于已证明生产稳定性**。ParadeDB 0.26.2 于 2026-10-16 发布，调研时发布时间较短。

验收通过后，建议将其定为部署基线，固定镜像摘要，同时持续安排 PostgreSQL、ParadeDB 和基础系统的补丁更新。固定版本用于控制变更，不意味着长期停止更新。

## 2. LTS 与支持周期

PostgreSQL 社区没有单独命名的 LTS 分支，每个大版本均提供约五年支持。官方建议使用对应大版本的最新小版本。

| PostgreSQL 大版本 | 调研时官方当前小版本 | 官方支持截止日期 |
| --- | --- | --- |
| 16 | 16.15 | 2028-11-09 |
| 17 | 17.11 | 2029-11-08 |
| 18 | 18.6 | 2030-11-14 |

选择 PG17 是在成熟度和剩余支持时间之间的工程折中，不代表 PG18 不稳定。如果更重视最长剩余支持时间，也可以评估 PG18，但本次没有完成对应镜像与业务的验证。

未查到 ParadeDB 社区版本与 PostgreSQL 同等的公开五年 LTS 支持承诺。因此不能将 `ParadeDB 0.26.2 + PostgreSQL 17` 称为整套五年 LTS，也不能把 PG17 的支持截止日期当作该固定镜像的维护承诺。

来源：[PostgreSQL 官方版本支持政策](https://www.postgresql.org/support/versioning/)。

## 3. 已核查的镜像标签和架构

本次从本机查询 Docker Hub API，并对部分标签直接查询 Docker Registry manifest。以下为调研当时的结果，标签可用性日后可能变化。

| 标签 | 查询结果 | Linux ARM64 |
| --- | --- | --- |
| `paradedb/paradedb:0.15.20-pg16` | Hub API 与 Registry 均返回 404 | 当前无法重新拉取或核实 |
| `paradedb/paradedb:v0.15.20-pg16` | Registry 返回 404 | 当前无法核实 |
| `paradedb/paradedb:0.15.26-pg16` | 标签存在 | 已确认 |
| `paradedb/paradedb:0.25.10-pg16` | 标签存在，已查 manifest | 已确认 |
| `paradedb/paradedb:0.25.11-pg17` | 标签存在 | 已确认 |
| `paradedb/paradedb:0.26.2-pg17` | 标签存在 | 已确认 |

404 仅说明官方仓库当前无法按该标签取得镜像，不证明它历史上从未发布。若其他机器已有本地缓存，仍可能继续运行，但不适合作为新环境可重复部署的依赖。

`0.15.20` 软件本身是 2025-05-16 发布的正式版本；软件发布版本与当前 Docker 镜像标签是否存在是两件事。后续 0.15.21 还修复了查询结果、重扫描状态、排序等问题，所以不建议新部署继续围绕 0.15.20 选型。

0.15.26-pg16 可作为尽量少改旧应用的测试候选，但不属于本次长期部署的首选。0.25.11-pg17 也有可用 ARM64 镜像，本次最终推荐测试更新的正式版本 0.26.2-pg17；没有证据据此承诺后者在所有负载下都比前者稳定。

来源：

- [Docker Hub 官方标签列表](https://hub.docker.com/r/paradedb/paradedb/tags)
- [ParadeDB 0.15.20 发布记录](https://github.com/paradedb/paradedb/releases/tag/v0.15.20)
- [ParadeDB 0.15.21 发布记录](https://github.com/paradedb/paradedb/releases/tag/v0.15.21)
- [ParadeDB 0.25.11 发布记录](https://github.com/paradedb/paradedb/releases/tag/v0.25.11)
- [ParadeDB 0.26.2 发布记录](https://github.com/paradedb/paradedb/releases/tag/v0.26.2)

## 4. 推荐镜像内的组件与摘要

根据官方 ARM64 manifest 对应的镜像配置、环境变量和构建历史核查：

| 组件 | 版本或状态 |
| --- | --- |
| PostgreSQL | `17.11-1.pgdg13+2` |
| pg_search | `0.26.2` |
| pgvector | `0.8.6` |
| 基础发行版 | Debian trixie |
| 预加载配置 | 构建历史中配置了 `pg_search,pg_cron,pg_stat_statements` |
| 架构 | 同一标签提供 `linux/amd64`、`linux/arm64` |

调研时 Docker Hub 返回的多架构索引摘要：

```text
sha256:0674d7b4e68833b9ced8fee8a59b61537f5700e2136e4f246431e767d29ed10d
```

ARM64 镜像 manifest 摘要：

```text
sha256:0946349b76e56c5b4d7aec060ed1857880aad1c28439ef2cf7fa40cd07d28515
```

验收通过后，可使用多架构索引摘要配合平台参数固定内容：

```yaml
image: paradedb/paradedb:0.26.2-pg17@sha256:0674d7b4e68833b9ced8fee8a59b61537f5700e2136e4f246431e767d29ed10d
platform: linux/arm64
```

该示例是镜像选型片段，不是完整 Compose 文件。新环境应使用新建的数据库数据卷，并核查镜像数据目录、PGDATA、初始化脚本和实际扩展创建情况。

## 5. 与现有业务需求的对应关系

| 项目需求 | 代码中观察到的使用方式 | 推荐组合的对应能力与待验证项 |
| --- | --- | --- |
| 文档全文检索 | `chunk_text @@@ :query_text` | pg_search 提供全文检索；验证现有查询语法和结果 |
| BM25 排序 | `paradedb.score(c.id)` | 提供相关性评分；验证函数兼容、排序及 JOIN 行为 |
| 中文及多语言分词 | 索引 `text_fields` 指定 ICU | 支持 ICU，也可评估 Jieba；验证旧配置语法和中文召回 |
| 向量字段与检索 | SQLAlchemy `Vector`，多种维度 | 镜像包含 pgvector；验证建表、实际距离算子及查询 |
| 向量索引 | 模型中使用 IVFFlat | 验证所用维度、操作符类和索引创建；不能仅凭扩展存在认定索引可用 |
| 模糊匹配 | 初始化创建 `pg_trgm` | 验证新库中扩展创建和相关索引 |
| 用户权限和目录过滤 | 全文查询 JOIN 文档表，按用户、文档 ID 过滤 | 验证过滤后的召回和排序，防止跨用户数据进入结果 |

主要代码位置：

- `lda-api/backend/app/admin/crud/crud_doc_chunk.py`
- `lda-api/backend/app/admin/crud/crud_doc_embedding.py`
- `lda-api/backend/app/admin/model/sys_doc_embedding.py`
- `lda-api/backend/sql/init_test_data_pg.sql`
- `lda-api/backend/sql/init_extensions.sql`

项目中观察到的向量维度包括 384、768、1024、1536、3072；模型中并非每种维度都定义了 IVFFlat 索引。不同索引和数据类型的维度限制需要分别核查，不能将“可以存储”与“可以按当前定义创建索引”等同。

中文分词能力参考：[ParadeDB 官方分词与 v2 API 说明](https://www.paradedb.com/blog/v2api)。

## 6. 上线前必须完成的业务验证

不涉及旧数据迁移，仍需适配和验证应用的初始化 SQL 与查询 SQL，不能仅替换镜像标签后认定部署完成。

1. 在麒麟 ARM64 上启动隔离的测试实例，核查实际 PostgreSQL 版本、可用扩展、已创建扩展和预加载配置。
2. 创建 `vector`、`pg_search`、`pg_trgm` 等项目所需扩展，执行实际建表及初始化流程。镜像中安装了扩展包，不代表每个业务数据库都已创建该扩展。
3. 使用实际初始化 SQL 验证 `USING bm25`、`key_field` 和 `text_fields` 的兼容性；按所选版本文档调整，不假定旧语法完全兼容。
4. 使用中文、英文、中英文混合、短词和专有名词测试 ICU 分词、全文召回、评分和排序。若比较 Jieba，使用同一组业务样例衡量效果。
5. 验证 `@@@`、`paradedb.score()`、JOIN、用户权限和目录过滤等现有查询。必要时对照新 API 调整代码。
6. 验证各实际使用的向量维度、索引创建、距离计算和检索结果，并检查执行计划是否按预期使用索引。
7. 执行代表性的并发读写、更新删除后的检索、重启恢复，以及备份恢复测试。
8. 验收通过后，统一开发、普通部署和 ARM64 部署的版本基线，并固定镜像摘要。

## 7. 项目当前配置差异

调研时读取到：

| 文件 | 当前镜像 |
| --- | --- |
| `lda-api/deploy/backend/docker-compose.yml` | `paradedb/paradedb:0.15.20-pg16` |
| `lda-api/deploy/dev/docker-compose.yml` | `paradedb/paradedb:0.15.20-pg16` |
| `lda-api/deploy/backend/docker-compose.arm64.yml` | `paradedb/paradedb:0.25.10-pg16` |

这些环境当前并不一致。本次只保存调研结果，没有修改 Compose、初始化 SQL，也没有在本地或服务器上切换数据库。

## 8. 已完成与未完成的核查范围

已完成：官方支持周期、发布记录、Docker Hub 标签、候选镜像架构、推荐 ARM64 镜像配置和构建历史，以及项目检索相关代码检查。

未完成：推荐镜像在麒麟服务器上的数据库启动测试、项目初始化、业务检索回归、压力测试及恢复演练。因此本报告给出的是有依据的版本候选和验收条件，不是生产验收结论或长期支持保证。
