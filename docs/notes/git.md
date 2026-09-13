# Git 常用命令

## 基础配置

```bash
git config --global user.name "your name"
git config --global user.email "your@email.com"
git config --global core.editor vim
git config --global core.autocrlf input      # Linux/mac 下换行转 LF
git config --global init.defaultBranch main # 默认分支名改 main
git config --list                 # 查看全部配置
git config --global credential.helper store # 记住凭据（HTTPS）
```

常用全局别名：

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --all --decorate"
git config --global alias.last "log -1 HEAD --stat"
```

## 初始化与克隆

```bash
git init                # 初始化仓库
git clone url           # 克隆
git clone --depth 1 url # 浅克隆（只拉最近一次，大仓库提速）
git clone --recursive url    # 克隆并拉取子模块
git clone -b dev url    # 克隆指定分支
```

## 日常状态与提交

```bash
git status              # 工作区状态
git status -s           # 精简状态
git add file            # 暂存文件
git add .               # 暂存全部改动
git add -u              # 暂存已跟踪文件的修改/删除
git add -p              # 交互式分块暂存（挑着提交）
git commit -m "msg"     # 提交
git commit -am "msg"    # 跳过 add 直接提交已跟踪文件
git commit --amend -m "新消息"   # 修改最后一次提交（⚠️本地未推送时用）
git diff                # 未暂存改动
git diff --cached       # 已暂存改动
git diff HEAD           # 所有改动（相对 HEAD）
git diff --stat         # 改动文件统计
```

## 查看历史

```bash
git log                 # 提交历史（q 退出）
git log --oneline       # 一行一条
git log --oneline --graph --all  # 图形化 + 全部分支
git log -5              # 最近 5 条
git log --author=name   # 按作者过滤
git log --since="2025-05-13 00:00" --until="2025-05-23 23:59" --pretty=format:"%s" --date=short
                        # 按时间范围看某段时间的提交主题
git log -p file         # 某个文件的修改历史（逐行）
git log --oneline -- file   # 某个文件历次提交
git blame file          # 每一行是谁最后一次改的
git show commit-hash    # 查看某次提交的具体改动
git show HEAD           # 查看最新提交改动
git reflog              # 所有 HEAD 移动记录（找回丢失提交的救命稻草）
```

## 分支管理

```bash
git branch              # 列出本地分支
git branch -a           # 列出远程分支
git branch dev          # 创建分支
git branch -m dev rename # 重命名分支
git branch -d dev       # 删除分支（-D 强制）
git switch dev          # 切换分支（新命令，等价 checkout）
git checkout dev        # 切换分支（旧写法）
git switch -c new       # 创建并切换
git checkout -b new     # 创建并切换（旧写法）
git push origin -d dev  # 删除远程分支
git branch --merged     # 已合并进当前分支的分支
git branch --no-merged  # 未合并的分支
```

## 合并与冲突

```bash
git merge dev           # 把 dev 合并进当前分支
git merge --no-ff dev   # 保留一条 merge 提交记录
git merge --abort       # 冲突解决混乱时放弃合并
git rebase main         # 变基：把当前分支移植到 main 之上
git rebase -i HEAD~3    # 交互式整理最近 3 条提交（squash/split/改消息）
```

冲突处理流程：

```bash
git status              # 看哪些文件冲突
# 手动编辑冲突文件（<<<<<<< HEAD ... >>>>>>> 之间）
git add 冲突文件
git commit              # 完成合并
# 或直接使用其中的某一版
git checkout --ours file   # 保留当前分支版本
git checkout --theirs file # 保留对方分支版本
```

> 原则：**公共分支勿随意 rebase**；本地私有提交才用 rebase 整理历史。

## 远程仓库

```bash
git remote -v           # 查看远程
git remote add origin url   # 添加远程
git remote remove origin    # 移除远程
git remote set-url origin url   # 修改远程地址
git fetch origin        # 拉取远程但不合并
git pull                # 拉取并合并（= fetch + merge）
git pull --rebase       # 拉取并变基（保持线性历史）
git push                # 推送当前分支
git push -u origin main # 首次推送并设置上游
git push --tags         # 推送标签
git push -f             # 强制推送 ⚠️ 覆盖远程，破坏公共历史慎用
git push --force-with-lease  # 安全强推：仅当远程未被我漏掉的新提交时
```

## 撤销与回退

```bash
git restore file            # 丢弃工作区改动（回到 HEAD）
git restore --staged file   # 撤出暂存区（保留工作区改动）
git checkout -- file        # 旧写法：丢弃工作区改动
git reset --soft HEAD~1     # 撤销最后提交，改动保留在暂存区
git reset --mixed HEAD~1    # 撤销最后提交，改动保留在工作区
git reset --hard HEAD~1     # 撤销最后提交并丢弃改动 ⚠️ 不可找回
git revert commit-hash      # 新增一条反向提交（安全撤销已推送的提交）
```

| 命令 | 本地区影响 | 适合场景 |
| --- | --- | --- |
| `git reset --soft` | 保留改动在暂存区 | 提交消息打错了要重提 |
| `git reset --mixed` | 保留改动在工作区 | 误提交了不想提交的文件 |
| `git reset --hard` | 丢弃全部改动 | 彻底不要这次改动（危险） |
| `git revert` | 生成反向新提交 | 撤销已推送到公共分支的提交 |

## 标签

```bash
git tag v1.0.0          # 打轻量标签
git tag -a v1.0.0 -m "release 1.0.0"   # 打附注标签（推荐）
git tag -l "v1.*"       # 列出按模式匹配的标签
git tag -d v1.0.0       # 删除本地标签
git push origin v1.0.0  # 推送单个标签
git checkout v1.0.0     # 检出标签（进入 detached HEAD，适合只读查看）
```

## 暂存（stash）

```bash
git stash               # 暂存未提交改动（工作区变干净）
git stash list          # 查看暂存列表
git stash pop           # 恢复并删除最上面一条
git stash apply         # 恢复但保留（可多次恢复）
git stash drop stash@{0}  # 删除指定暂存
git stash save "msg"    # 带说明暂存
git stash -u            # 连未跟踪文件一起暂存
```

## 子模块

```bash
git submodule add url path        # 添加子模块
git submodule update --init --recursive   # 拉取全部子模块
git submodule foreach git pull    # 更新所有子模块
```

## 常用速查

| 场景 | 命令 |
| --- | --- |
| 查看改动 | `git status` / `git diff` |
| 提交三步 | `git add .` → `git commit -m "msg"` → `git push` |
| 回滚一条已提交 | `git reset --mixed HEAD~1` |
| 撤销已推送提交 | `git revert <hash>` |
| 只推送部分文件 | `git add file && git commit && git push` |
| 拉取时保持线性历史 | `git pull --rebase` |
| 找回误删提交 | `git reflog` → `git reset --hard <hash>` |
| 换行符 Windows 专用 | `git config --global core.autocrlf true` |