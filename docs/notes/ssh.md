# SSH 常用命令

## 基本登录

```bash
ssh user@host                # 远程登录（默认 22 端口）
ssh -p 2222 user@host        # 指定端口
ssh user@host -o ConnectTimeout=5     # 连接超时 5 秒
ssh root@host "ls /etc"      # 远程执行单条命令，不进入交互
ssh -v user@host             # 详细输出（-vvv 用于排错）
ssh -t user@host "top"       # 分配终端（配合需要 tty 的命令）
ssh -A user@host             # 转发认证代理（跳板机场景）
```

## 生成密钥（ssh-keygen）

```bash
ssh-keygen -t rsa -b 4096 -C "ning.huang.ridson@gmail.com"    # 注释邮箱，便于识别
ssh-keygen -t ed25519 -C "your@email.com"                     # 现代推荐，更短更快更安全
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""              # 指定文件名、空口令
ssh-keygen -t ed25519 -f ~/.ssh/github -C "github" -N ""      # 一键生成（脚本用）
# 别名建议
alias sshgen='ssh-keygen -t ed25519 -C "$(whoami)@$(hostname)"'
```

常用参数：`-t` 类型（`ed25519` 推荐、`rsa`）、`-b` 位数、`-C` 注释、`-f` 输出文件、`-N` 口令、`-q` 静默。

生成后得到一对文件：

- 私钥 `~/.ssh/id_ed25519` —— 保存在本地，**不要泄露**
- 公钥 `~/.ssh/id_ed25519.pub` —— 内容可以安全复制，放到服务器

查看 / 管理：

```bash
cat ~/.ssh/id_ed25519.pub    # 查看公钥内容
ssh-keygen -l -f ~/.ssh/id_ed25519 # 查看密钥指纹
ssh-keygen -p -f ~/.ssh/id_ed25519 # 修改私钥口令
```

## 免密登录（ssh-copy-id）

```bash
ssh-copy-id user@host                    # 自动把公钥追加到服务器 ~/.ssh/authorized_keys
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host   # 指定公钥
ssh-copy-id -p 2222 user@host            # 指定端口
```

`ssh-copy-id` 不可用时的公钥 ==手动== 方式：

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@host "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

服务端权限检查（Permission denied 常见原因）：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## ~/.ssh/config 配置文件（强烈推荐）

管理多台主机，免记 IP 和参数：

```
Host github
    HostName github.com
    User git
    IdentityFile ~/.ssh/github
    Port 22

Host myserver
    HostName 192.168.1.10
    User root
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 30       # 每 30s 发心跳保活
    ServerAliveCountMax 3
```

配置后即可：`ssh myserver`、`git clone git@github:repo`。限定某主机只能用密钥：

```
Host *
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
```
> ⚠️ 上面的宽松配置仅用于内网/测试，公网不建议关闭 host key 校验。

## 文件传输 scp / sftp / rsync

```bash
scp file.txt user@host:/path/            # 上传
scp -P 2222 file.txt user@host:/tmp/     # scp 指定端口用大写 -P
scp -r dir/ user@host:/path/             # 上传目录
scp user@host:/path/file.txt ./          # 下载
scp -P 2222 -i ~/.ssh/github file user@host:/tmp/

sftp user@host        # 交互式：put/upload, get/download, ls, lls, cd
# rsync 走 ssh 同步（推荐用于增量/大目录）
rsync -avz dir/ user@host:/path/
rsync -avz --progress user@host:/data/ ./data/
```

## SSH 隧道（端口转发）

隧道三类，都在本地执行：

### 本地转发（-L）：把本地端口转发到远端能访问的目标

```bash
# 本地 -L 本地端口:目标地址:目标端口 跳板
ssh -L 8080:10.0.0.5:80 user@jump-host
# 例：MySQL 3306、Redis 6379 通过跳板机访问内网服务
ssh -L 3306:db.internal:3306 jump
ssh -L 6379:172.16.0.8:6379 user@jump
# 访问 http://localhost:8080 即等于访问 http://10.0.0.5:80
```

### 远程转发（-R）：把远端端口转发回本地

```bash
ssh -R 9000:localhost:3000 user@server
# server 的 9000 端口流量转发到本地 3000（用于把本机服务暴露给服务器）
```

### 动态转发（-D）：SOCKS5 代理，浏览器走隧道上网/翻墙

```bash
ssh -D 1080 user@host     # 本地 1080 起 SOCKS5 代理
# 浏览器/系统代理设置：SOCKS5 127.0.0.1:1080
curl --socks5 127.0.0.1:1080 https://www.google.com
```

### 常用隧道参数组合

```bash
ssh -CNfg -L 3306:db.internal:3306 jump
# -C 压缩 -N 不执行远程命令 -f 后台运行 -g 允许其他机器访问该转发端口
ssh -NL 1080:localhost:1080 us-server   # 纯隧道，不分配终端
ssh -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 jump
```

隧道关闭：找到 ssh 进程 `pgrep -af "ssh -"`，`kill PID`。

## 多级跳板（ProxyJump）

```bash
# 先连 jump-a，再从 jump-a 连 jump-b，最后到达目标
ssh -J jump-a,jump-b target
ssh -J user@jump:2222 user@target          # 可带各自端口
# 配置文件写法
Host target
    HostName 10.1.1.1
    User root
    ProxyJump jump-a,jump-b
```

老语法 ProxyCommand 等价写法：

```bash
ssh -o ProxyCommand="ssh -W %h:%p jump" user@target
```

## 排错与安全加固

```bash
ssh -vvv user@host        # 三级调试输出，定位握手失败
ssh -o StrictHostKeyChecking=no user@host   # 跳过首次 host key 确认（脚本用）
ssh-keyscan -p 22 host    # 导出服务器公钥指纹
ssh-keygen -R host        # 从 known_hosts 删除旧指纹（换机器/重新部署后常用）
```

检查 SSH 服务端配置 `/etc/ssh/sshd_config`：

```
PermitRootLogin prohibit-password   # 禁止 root 密码登录，仅密钥
PasswordAuthentication no          # 关闭密码认证，只允许密钥
Port 2222                           # 改默认端口降低被扫描风险
AllowUsers user1 user2              # 限定允许登录的用户
```

改完：`sudo systemctl restart ssh`。

## 免交互执行（脚本场景）

```bash
# 使用密钥 + KnownHostsFile 全自动
ssh -i ~/.ssh/deploy -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@host "deploy.sh"

# 避免密码输入：sshpass（仅测试环境用，勿把密码写进生产脚本）
sshpass -p 'pass' ssh user@host "uptime"
```

## 登录后的常用运维命令

```bash
who / w                  # 所有登录会话
last                     # 最近登录记录
lastlog                  # 每个用户最后登录时间
ss -tn state established # 当前 SSH 连接
journalctl -u ssh -f     # 实时查看 SSH 登录日志
grep -i "Failed" /var/log/auth.log   # 排查暴力破解
```

## 速查表

| 场景 | 命令 |
| --- | --- |
| 登录 | `ssh user@host` |
| 指定端口 | `ssh -p 2222 user@host` |
| 生成密钥 | `ssh-keygen -t ed25519 -C "邮箱"` |
| 免密 | `ssh-copy-id user@host` |
| 上传文件 | `scp -P 22 file user@host:/path` |
| 内网转发 | `ssh -L 3306:db:3306 jump` |
| SOCKS5 代理 | `ssh -D 1080 user@host` |
| 多级跳板 | `ssh -J jump target` |