# Shell 技巧与任务调度

## 管道与重定向

```bash
cmd1 | cmd2             # 管道：前一个输出作为后一个输入
cmd1 2>&1 | tee log     # 合并错误流并同时输出到屏幕和文件
cmd > file              # 输出重定向（覆盖）
cmd >> file             # 输出重定向（追加）
cmd 2> err.log          # 仅错误输出
cmd > /dev/null 2>&1    # 丢弃全部输出（1 stdout，2 stderr，& 合并）
cmd <<< "text"          # 字符串作为 stdin
cmd <<EOF
多行内容
EOF
```

| 描述符 | 含义 |
| --- | --- |
| 0 | stdin 标准输入 |
| 1 | stdout 标准输出 |
| 2 | stderr 错误输出 |

## 变量与环境变量

```bash
name=world              # 定义变量（= 两侧不能有空格）
echo "hello $name"      # 使用变量
export PATH=$PATH:/opt/bin   # 导出为环境变量
env                     # 查看全部环境变量
echo $HOME $USER $SHELL # 常用变量
unset name              # 删除变量
readonly name           # 只读变量
```

`~/.bashrc`、`~/.profile`、`/etc/profile` 中写入 `export ...` 可持久生效；修改后 `source ~/.bashrc` 立即生效。

## 历史与快捷键

```bash
history                 # 查看命令历史
history | grep nginx    # 搜索历史
!100                    # 重新执行第 100 条
!!                      # 重新执行上一条
!$                      # 上一条命令的最后一个参数
Ctrl+R                  # 反向搜索历史（神器）
Ctrl+A / Ctrl+E         # 跳到行首 / 行尾
Ctrl+U / Ctrl+K         # 删到行首 / 删到行尾
Ctrl+W                  # 删一个词
Ctrl+L                  # 清屏
Ctrl+C                  # 终止当前命令
Ctrl+Z                  # 挂起当前命令（jobs/fg 恢复）
Tab                     # 命令/文件路径补全
```

## alias 别名

```bash
alias ll='ls -la'       # 定义别名
alias gst='git status'
unalias ll              # 删除别名
alias                   # 查看全部别名
# 持久化：写入 ~/.bashrc
echo "alias ll='ls -la'" >> ~/.bashrc && source ~/.bashrc
```

## crontab 定时任务

```bash
crontab -e              # 编辑当前用户定时任务
crontab -l              # 查看任务列表
crontab -r              # 清空任务 ⚠️
crontab -u user -l      # 查看指定用户任务
```

时间格式：`分 时 日 月 周  命令`

```bash
# 每天凌晨 3 点备份
0 3 * * * /opt/backup.sh
# 每 10 分钟执行一次
*/10 * * * * /path/script.sh
# 每周一至周五 9 点
0 9 * * 1-5 echo work >> /tmp/t.log
```

常用写法：

```bash
systemctl list-timers   # 查看 systemd timer（现代替代）
# 日志查看
grep CRON /var/log/syslog | tail -20   # 验证 cron 是否执行
```

## at 一次性任务

```bash
at now + 1 hour         # 一小时后的交互式任务
at 21:00 2024-05-01
atq                     # 查看等待任务队列
atrm 5                  # 删除 5 号任务
```

## 后台长驻：screen / tmux

```bash
# tmux（推荐）
tmux new -s work        # 新建会话并命名
tmux ls                 # 列出会话
tmux attach -t work     # 重新连接会话
tmux kill-session -t work
# 会话内快捷键：Ctrl+B 后按 c 开新窗口、d 退出会话（进程保持）

# screen（老牌）
screen -S work          # 新建
screen -r work          # 重连
screen -ls              # 列出
```

> 长时间运行的任务（如构建、训练）建议放 tmux，告别 ssh 断连即中断。

## 变量展开与判断速查

```bash
${var:-default}        # 未设置时用默认值
${var:=default}        # 未设置时赋值
${#var}                # 字符串长度
${var#prefix} ${var%suffix}  # 去前缀/后缀
$(cmd) / `cmd`          # 命令替换
if [ -f /etc/passwd ]; then echo exists; fi   # 判断文件存在
[ -d dir ] / [ -x file ]    # 目录存在 / 可执行
```

## 快速诊断脚本技巧

```bash
set -euo pipefail       # 脚本开头：出错即停、未定义变量报错、管道失败上报
time command            # 统计命令耗时
strace command          # 跟踪系统调用