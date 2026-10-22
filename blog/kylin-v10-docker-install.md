# 银河麒麟 V10 安装 Docker、Docker Compose 与镜像加速配置

本文记录 2026-10-21 在服务器上实际执行并验证成功的安装过程。命令在目标 Linux 服务器上以 root 身份执行。

> 后续更新：构建 Debian trixie 镜像时发现 Docker 18.09 存在 seccomp 兼容性问题，服务器随后升级至 Docker 29.9.2。前文保留首次安装记录，当前版本和升级注意事项见第 9 节。

## 1. 已验证的环境

| 项目 | 实际值 |
| --- | --- |
| 操作系统 | Kylin Linux Advanced Server V10 (Halberd)，银河麒麟高级服务器版 |
| CPU 架构 | aarch64 / ARM64 |
| 内核 | 4.19.90-89.43.v2401.ky10.aarch64 |
| 包管理器 | yum / dnf |
| 软件源 | 麒麟官方 `ks10-adv-os`、`ks10-adv-updates` |
| 软件源路径版本 | V10SP3-2403 |
| Docker RPM | `docker-engine-18.09.0-261.p07.04.ky10.aarch64`（Epoch 为 1） |
| Compose RPM | `docker-compose-1.22.0-4.ky10.noarch` |
| Docker 存储驱动 | overlay2 |

其他麒麟版本或 x86_64 机器应先检查环境，不应直接假定包版本和依赖相同。本次使用麒麟官方软件包，未添加 CentOS Docker CE 软件源。

```bash
cat /etc/os-release
cat /etc/kylin-release
uname -m
uname -r
df -h / /var
```

## 2. 检查软件源

```bash
ls /etc/yum.repos.d/
cat /etc/yum.repos.d/*.repo
```

本机曾存在错误的 `/etc/yum.repos.d/docker.com.repo`：

```ini
[docker.com]
name=created by dnf config-manager from https://docker.com
baseurl=https://docker.com
enabled=1
```

`https://docker.com` 是网站首页，不是 RPM 软件仓库。该配置会导致 yum 报错：

```text
Status code: 404 for https://www.docker.com/repodata/repomd.xml
Failed to download metadata for repo 'docker.com'
```

本次安装通过 `--disablerepo=docker.com` 临时跳过该源，未删除或永久禁用它。后续 yum 命令如仍遇到此错误，同样需要跳过该源。

检查麒麟源可用版本：

```bash
yum --disablerepo=docker.com list --showduplicates docker-engine docker-compose
```

如果其他机器没有名为 `docker.com` 的源，省略该参数即可。若麒麟官方源无法访问，需要先解决该源的网络或授权问题。

## 3. 安装 Docker

可以先预演依赖解析，确认待安装、升级或删除的软件包：

```bash
yum --disablerepo=docker.com install --assumeno docker-engine
```

实际安装并设置开机启动：

```bash
yum --disablerepo=docker.com install -y docker-engine
systemctl enable --now docker
```

本机此次新增的软件包为：

```text
docker-engine-18.09.0-261.p07.04.ky10.aarch64
containerd-1.2.0-213.p10.ky10.aarch64
docker-proxy-0.8.0.dev.2-100.p04.ky10.aarch64
```

下载约 32 MB，安装占用约 155 MB。本机此前已有 `docker-runc` 和 Podman，此次安装未卸载它们。其他机器的实际依赖以 yum 输出为准。

验证：

```bash
systemctl is-active docker
systemctl is-enabled docker
docker version
docker info
docker ps
```

本机结果：服务 `active`、开机启动 `enabled`，客户端和服务端版本均为 `18.09.0`，架构 `linux/arm64`，存储驱动 `overlay2`，数据目录 `/var/lib/docker`。

如启动失败：

```bash
systemctl status docker --no-pager -l
journalctl -u docker -n 100 --no-pager
```

## 4. 安装 Docker Compose

```bash
yum --disablerepo=docker.com install -y docker-compose
docker-compose version
```

本机输出：

```text
docker-compose version 1.22.0, build f46880f
docker-py version: 4.0.2
CPython version: 3.7.9
```

这是 **Compose V1**，命令带连字符：`docker-compose`。本次没有安装 Compose V2 插件，不能将文档中的 `docker compose` 命令原样套用到此环境。V1 不支持 `docker-compose ls`。

在包含 `docker-compose.yml` 的项目目录中使用：

```bash
docker-compose config     # 校验配置
docker-compose up -d      # 后台启动
docker-compose ps         # 查看项目容器
docker-compose logs -f    # 查看日志，Ctrl+C 退出日志跟踪
docker-compose down      # 停止并移除项目容器和网络
```

Compose 1.22.0 较旧，新版 Compose 文件中的字段可能不兼容；部署前先执行 `docker-compose config`。更换为新版 Compose 或 Docker 需要另外评估兼容性。

本次通过标准输入传入临时配置，验证 Compose 可以连接 Docker，不拉取镜像或创建容器：

```bash
printf 'version: !!str 3\nservices:\n  check:\n    image: busybox:1.36\n' \
  | docker-compose -f - -p compose-install-check ps
```

返回空的容器列表且退出成功，属于正常结果。

## 5. 排查 Docker Hub 拉取失败

本次执行：

```bash
docker pull python:3.10-slim
```

遇到：

```text
Get "https://registry-1.docker.io/v2/":
net/http: request canceled while waiting for connection
(Client.Timeout exceeded while awaiting headers)
```

网络检查：

```bash
curl -I --connect-timeout 8 --max-time 12 https://registry-1.docker.io/v2/
curl -I --connect-timeout 8 --max-time 12 https://auth.docker.io/
journalctl -u docker -n 50 --no-pager
```

本机两个域名均连接超时，说明此次失败发生在连接 Docker Hub 阶段，尚未进入镜像架构选择或镜像层下载阶段。

## 6. 配置镜像加速地址

本次采用两个公共第三方服务：

```text
https://docker.1ms.run
https://docker.xuanyuan.me
```

配置前测试 HTTPS 接口：

```bash
curl -sS -D - -o /dev/null --connect-timeout 5 --max-time 12 https://docker.1ms.run/v2/
curl -sS -D - -o /dev/null --connect-timeout 5 --max-time 12 https://docker.xuanyuan.me/v2/
```

本次均返回 `401` 和 `WWW-Authenticate` 认证挑战，表示 Registry 接口网络可达。这本身不保证目标镜像可下载，仍需实际拉取验证。

### 6.1 备份并编辑配置

先查看正在运行的容器，选择合适时间重启 Docker：

```bash
docker ps
mkdir -p /etc/docker
if [ -f /etc/docker/daemon.json ]; then
  cp -a /etc/docker/daemon.json "/etc/docker/daemon.json.bak.$(date +%Y%m%d-%H%M%S)"
  cat /etc/docker/daemon.json
fi
vi /etc/docker/daemon.json
```

本机此前没有该文件、没有运行中的容器，因此新建文件，内容为：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.xuanyuan.me"
  ]
}
```

如果文件已包含其他配置，应保留原有键值，只新增或修改 `registry-mirrors`。不要直接覆盖已有配置。JSON 不能包含注释或末尾多余逗号。

### 6.2 检查语法并重启

```bash
python3 -m json.tool /etc/docker/daemon.json
# 上一步成功后再执行：
systemctl restart docker
systemctl is-active docker
docker info
```

`docker info` 应包含：

```text
Registry Mirrors:
 https://docker.1ms.run/
 https://docker.xuanyuan.me/
```

若重启失败，检查 JSON 和日志，并确认启动参数没有重复设置同一选项：

```bash
journalctl -u docker -n 100 --no-pager
systemctl cat docker
cat /etc/sysconfig/docker
```

必要时恢复备份后重启。若原先没有配置文件，可编辑文件移除本次新增的 `registry-mirrors`；若无其他配置，可保留内容 `{}`，然后重启 Docker。

### 6.3 拉取并运行验证

```bash
docker pull python:3.10-slim
docker image inspect python:3.10-slim \
  --format '{{.Os}}/{{.Architecture}} {{json .RepoDigests}}'
docker run --rm --network none python:3.10-slim python --version
```

本次结果：

```text
Status: Downloaded newer image for python:3.10-slim
linux/arm64
Python 3.10.22
```

镜像摘要：

```text
sha256:6ff506466f8b1e981719b468cc0023b8ef000b983cdec0eafe119d01f379e31d
```

测试容器通过 `--rm` 自动删除。两个加速地址配置后的整体拉取和运行验证成功；本次未分别验证每个地址是否均能完整下载该镜像。`python:3.10-slim` 是可变标签，日后版本和摘要可能不同。

## 7. 后续使用与注意事项

- 配置生效后，正常使用 `docker pull python:3.10-slim`，无需在镜像名前加第三方域名。
- ARM64 机器使用的镜像必须支持 ARM64。下载成功后可用 `docker image inspect` 检查；换源不能解决镜像本身没有 ARM64 版本的问题。
- 镜像加速配置与 yum 软件源互相独立，不能用 `registry-mirrors` 修复 yum 的 404。
- 这两个地址属于第三方服务，可用性和使用规则可能变化。本次成功不代表持续可用。生产环境可将已验证镜像同步至自有或云上的私有仓库，并记录摘要。
- 华为云 SWR 账号专属加速地址需要从账号控制台获取，不能通过公开搜索获取用户自己的地址。
- Docker 和 Compose 版本均为此次麒麟官方源提供的版本，本文不代表新版 Docker 或 Compose V2 的安装步骤。

## 8. 参考资料

- [Docker：配置 Docker Hub 镜像代理](https://docs.docker.com/docker-hub/image-library/mirror/)
- [华为云 SWR：设置镜像加速器](https://support.huaweicloud.com/usermanual-swr/swr_01_0045.html)
- [毫秒镜像服务网站](https://1ms.run/)
- [轩辕镜像加速配置说明（第三方文档）](https://dockerdocs.xuanyuan.me/install/mirror)

## 9. 升级 Docker，修复 Debian trixie 构建问题

### 原因与验证

`python:3.10-slim` 此次基于 Debian trixie。旧版 Docker 18.09 下 `apt-get update` 下载索引后报错：

```text
E: Problem executing scripts APT::Update::Post-Invoke
E: Sub-process returned an error code
```

临时容器默认 seccomp 下失败，关闭 seccomp 后成功，确认与旧版引擎的安全过滤兼容性有关。关闭 seccomp 仅用于诊断，不作为长期配置。升级后默认 seccomp 下 APT 更新成功。

### 升级后的版本

| 组件 | 版本 |
| --- | --- |
| Docker 客户端和服务端 | 29.9.2 |
| containerd | 2.4.2 |
| runc | 1.5.2（静态包内 libseccomp 2.6.0） |
| Compose | 5.6.1 |
| Buildx | 0.38.1 |

麒麟当前源仅提供 18.09 系列，因此改用 [Docker 官方 ARM64 静态二进制包](https://download.docker.com/linux/static/stable/aarch64/docker-29.9.2.tgz)。此方式需要手动维护更新，`yum update` 不会自动升级这些新二进制。参考 [Docker 二进制安装说明](https://docs.docker.com/engine/install/binaries/)。

### 本次升级布局与流程

1. 先确认没有运行中容器；在本机从官方 HTTPS 地址下载 ARM64 包，再 SCP 上传，避免服务器外网慢或不稳定。
2. 新 Docker 二进制解压至 `/opt/docker/29.9.2/`，保留原 RPM 程序。
3. 停止 Docker 后，将 `/var/lib/docker` 和配置备份至 `/root/docker-upgrade-20261021/`，数据备份子目录为 `docker-data`，配置子目录为 `config`。
4. 添加 `/etc/systemd/system/docker.service.d/90-official-binary.conf`，使用新引擎和配套运行时，保留 overlay2、数据目录、镜像加速地址。
5. 创建 `/usr/local/bin/docker` 链接，指向 `/opt/docker/29.9.2/docker`，执行 `systemctl daemon-reload` 后启动 Docker。
6. 下载官方 Compose、Buildx ARM64 发布文件，核验 GitHub 发布中的 SHA256 后安装到 `/usr/local/lib/docker/cli-plugins/`。
7. 创建 `/usr/local/bin/docker-compose` 链接至新 Compose 插件，兼容旧命令写法；旧 Compose RPM 保留在 `/usr/bin/docker-compose`，不要直接使用它连接新版服务。

systemd 覆盖文件内容：

```ini
[Service]
Environment="PATH=/opt/docker/29.9.2:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=
ExecStart=/opt/docker/29.9.2/dockerd --live-restore --storage-driver=overlay2
```

此覆盖文件适用于本机已核实的配置。其他机器如有代理、额外启动参数或外部 containerd，应检查并保留相关设置后再调整。

首次启动提示旧 BuildKit 缓存格式不兼容（`legacy (v1) cache metadata`）。在服务停止状态下，将 `/var/lib/docker/buildkit` 移至 `/root/docker-upgrade-20261021/buildkit-legacy-cache` 后启动成功。原镜像保留，构建缓存重新生成。

### 升级后使用与验证

```bash
hash -r
docker version
docker compose version
docker-compose version
docker buildx version
docker buildx ls
systemctl is-active docker
systemctl is-enabled docker
docker images
docker info
docker run --rm --network none python:3.10-slim python --version
```

新 Compose 推荐写法为 `docker compose`；兼容命令 `docker-compose` 也指向新版本。已验证 Python 容器运行、Compose 连接和 Buildx 默认构建器正常。

后端在项目根目录构建：

```bash
cd /root/code/lda-api
bash build.sh builder
```

ARM64 机器原生构建 ARM64 镜像不要求跨架构模拟。Buildx 已安装，也可以使用项目的 `bash build-arm64.sh`。这些脚本使用 Bash，应使用 `bash` 执行，避免 `sh` 对 `pipefail` 等语法支持不同。

### 回退注意事项

回退需先停止 Docker，再停用此次 systemd 覆盖文件和新 CLI 链接，并恢复升级前的数据与配置后启动旧版。新引擎可能更新数据格式，不能只换回旧程序直接读取新数据。恢复前应另存升级后目录，避免覆盖后续产生的镜像、容器或业务数据。备份目录应暂时保留。
